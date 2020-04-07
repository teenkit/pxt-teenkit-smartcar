/**
 * Rainbow programable smart car
 * 彩虹可编程智能小车
 * 重庆润颐科技有限公司
 * www.rootbrother.com
 */
enum WHEELS {
    //% block="双轮"
    left_right,
    //% block="左轮"
    left = 0x60,
    //% block="右轮"
    right = 0x61
}

enum WHEELS_SINGLE {
    //% block="左轮"
    left = 0x60,
    //% block="右轮"
    right = 0x61
}

enum MOTOR_MOTION {
    //% block="前进"
    forward = 2,
    //% block="倒车"
    reverse = 1,
    //% block="刹车"
    brake = 3,
    /**
    //% block="空档"
    coast = 0
     */
}
enum TURN_TYPE {
    //% block="左转"
    round_left,
    //% block="右转"
    round_right

}
/**
 * 超声波测距单位
 */
enum PingUnit {
    //% block="厘米（cm）"
    Centimeters,
    //% block="微秒（μs）"
    MicroSeconds,
    //% block="英寸（inches）"
    Inches
}
/**
 * 红外遮挡传感器
 */
enum IrSensor {
    //% block="车头"
    head,
    //% block="左侧"
    left,
    //% block="右侧"
    right
}
/**
 * 光敏
 */
enum light_sensor {
    //% block="前方"
    front,
    //% block="左前方"
    front_left,
    //% block="右前方"
    front_right,
    //% block="左后方"
    rear_left,
    //% block="右后方"
    rear_right
}

/**
 * 自定义图形块
 */
//% weight=100 color=#0fbc11 icon="\uf1b9"  block="彩虹智能小车"
namespace rainbow_samart_car {
    //TI DRV8830
    let coast = 0;
    let Motor_speed = [0x05, 0x06, 0x07, 0x08, 0x09, 0x0A, 0x0B, 0x0C, 0x0D, 0x0E, 0x0F, 0x10, 0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17, 0x18, 0x19, 0x1A, 0x1B, 0x1C, 0x1D, 0x1E, 0x1F, 0x20, 0x21, 0x22, 0x23, 0x24, 0x25, 0x26, 0x27, 0x28, 0x29, 0x2A, 0x2B, 0x2C, 0x2D, 0x2E, 0x2F, 0x30, 0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x3A, 0x3B, 0x3C, 0x3D, 0x3E, 0x3F];
    let current_speed_lw = 0;
    let current_speed_rw = 0;

    //left wheel read address
    let r_lw = 0x41;
    let r_rw = 0x43;

    //max1239EEE+数模转换: 读取3个遮挡传感器数据
    let MAX1239 = 0x35;
    /**
     * setup字节，配置为：11110010。即： 使用内部参考电压，并保持参考电压开启
     */
    let ir_setup = 0xf2;
    /**
     * config字节，配置为： 00000101。 即采取从AIN0扫描到AIN2的扫描模式，和single-end的转换模式
     */
    let ir_config_sn = 0x5;
    /**
     * config字节，配置为： 00100001。 convert 8 times
     */
    let ir_config_l = 0x21;
    /**
     * config字节，配置为： 00100011。 convert 8 times
     */
    let ir_config_m = 0x23;
    /**
     * config字节，配置为： 00100101。 convert 8 times
     */
    let ir_config_r = 0x25;

    /**
     * 读取光敏电阻数模转换配置：01010101。
     * 
     */
    let ad_config_light = 0x55;
    /**
     * set reg
     */
    function setReg(dev: WHEELS, reg: number, dat: number): void {
        let buf = pins.createBuffer(2);
        buf.setNumber(NumberFormat.UInt8BE, 0, reg);
        buf.setNumber(NumberFormat.UInt8BE, 1, dat);
        pins.i2cWriteBuffer(dev, buf);
    }

    /**
     * get reg
     */
    function getReg8(dev: WHEELS, reg: number): number {
        let buf = pins.createBuffer(1)
        buf.setNumber(NumberFormat.UInt8BE, 0, reg)
        pins.i2cWriteBuffer(dev, buf)
        buf = pins.i2cReadBuffer(dev, 1)
        return buf.getNumber(NumberFormat.UInt8BE, 0);
    }

    /**
     * convert a Dec data to Hex
     */
    function DecToHex(dat: number): number {
        return Math.idiv(dat, 10) * 16 + (dat % 10)
    }

    /**
     * 停止运动
     * 
     * @param dev is the motor type
     */
    //% blockId="TEENKIT_CAR_BRAKE_CONFIG" block="刹车 %dev"
    //% weight=98 blockGap=8
    export function brake(dev: WHEELS): void {

        let dat = pins.createBuffer(2);
        dat.setNumber(NumberFormat.UInt8BE, 0, 0X00);
        dat.setNumber(NumberFormat.Int8LE, 1, MOTOR_MOTION.brake)

        switch (dev) {
            case WHEELS.left:
                pins.i2cWriteBuffer(dev, dat);
                current_speed_lw = 0;
                break;
            case WHEELS.right:
                pins.i2cWriteBuffer(dev, dat);
                current_speed_rw = 0;
                break;
            case WHEELS.left_right:
                pins.i2cWriteBuffer(WHEELS.left, dat);
                pins.i2cWriteBuffer(WHEELS.right, dat);
                current_speed_lw = 0;
                current_speed_rw = 0;
                break;
        }


    }

    /**
     * 设置智能小车的运动
     * 
     * @param device is the motor type
     * @param act is action the motor to take
     * @param speed is motor drive speed range from 0~255
     */
    //% blockId="TEENKIT_CAR_ACTION_CONFIG" block="行进 %dev|动作%act|速度 %speed"
    //% weight=100 blockGap=8
    //% speed.min=1 speed.max=59
    export function setMotorAction(dev: WHEELS, act: MOTOR_MOTION, speed: number): void {
        let spd = Motor_speed[speed - 1];
        spd = spd << 2;
        if (speed == 0) {
            spd = spd | coast; //速度为零时，设置为空档。
        } else {
            spd = spd | act;
        }


        let dat = pins.createBuffer(2);
        dat.setNumber(NumberFormat.UInt8BE, 0, 0X00);
        dat.setNumber(NumberFormat.Int8LE, 1, spd)

        switch (dev) {
            case WHEELS.left:
                pins.i2cWriteBuffer(dev, dat);

                act == MOTOR_MOTION.reverse ? current_speed_lw = -speed : current_speed_lw = speed;
                break;
            case WHEELS.right:
                pins.i2cWriteBuffer(dev, dat);
                act == MOTOR_MOTION.reverse ? current_speed_rw = -speed : current_speed_rw = speed;
                break;
            case WHEELS.left_right:
                pins.i2cWriteBuffer(WHEELS.left, dat);
                pins.i2cWriteBuffer(WHEELS.right, dat);

                act == MOTOR_MOTION.reverse ? current_speed_lw = -speed : current_speed_lw = speed;
                act == MOTOR_MOTION.reverse ? current_speed_rw = -speed : current_speed_rw = speed;

                break;
        }


    }
    /**
     * 设置智能小车的转向
     * 
     * @param t is the motor type
     * @param speed is motor drive speed range from 0~255
     */
    //% blockId="TEENKIT_CAR_TURN" block="原地转向 %t|速度 %speed"
    //% weight=99 blockGap=8
    //% speed.min=0 speed.max=58
    export function roundTurn(t: TURN_TYPE, speed: number) {

        let lw = pins.createBuffer(2);
        lw.setNumber(NumberFormat.Int8LE, 0, 0x00);

        let rw = pins.createBuffer(2);
        rw.setNumber(NumberFormat.Int8LE, 0, 0x00);

        let lspd = Motor_speed[speed];
        lspd = lspd << 2;
        let rspd = Motor_speed[speed];
        rspd = rspd << 2;

        switch (t) {
            case TURN_TYPE.round_left:
                lspd = lspd | MOTOR_MOTION.reverse;
                lw.setNumber(NumberFormat.Int8LE, 1, lspd);
                current_speed_lw = -speed;

                rspd = rspd | MOTOR_MOTION.forward;
                rw.setNumber(NumberFormat.Int8LE, 1, rspd);
                current_speed_rw = speed;

                pins.i2cWriteBuffer(WHEELS.left, lw);
                pins.i2cWriteBuffer(WHEELS.right, rw);

                break;
            case TURN_TYPE.round_right:
                lspd = lspd | MOTOR_MOTION.forward;
                lw.setNumber(NumberFormat.Int8LE, 1, lspd);
                current_speed_lw = speed;

                rspd = rspd | MOTOR_MOTION.reverse;
                rw.setNumber(NumberFormat.Int8LE, 1, rspd);
                current_speed_rw = -speed;

                pins.i2cWriteBuffer(WHEELS.left, lw);
                pins.i2cWriteBuffer(WHEELS.right, rw);

                break;

        }
    }
    /**
     * 读取小车状态
     * 
     * @param dev is the motor type
     */
    //% blockId="TEENKIT_CAR_SPEED" block="转速 %dev"
    //% weight=97 blockGap=8

    export function readSpeed(dev: WHEELS_SINGLE): number {
        switch (dev) {
            case WHEELS_SINGLE.left:
                return current_speed_lw;
                break;
            case WHEELS_SINGLE.right:
                return current_speed_rw;
                break;
            default:
                return 0;
                break;
        }
    }

    /**
     * 使用超声波测距传感器探测障碍物距离
     * @param trig tigger pin
     * @param echo echo pin
     * @param unit desired conversion unit
     * @param maxCmDistance maximum distance in centimeters (default is 500)
     */
    //% blockId=sonar_ping block="障碍物距离 单位 %unit"
    //% weight=100 blockGap=8
    //% subcategory=传感器
    export function ping(unit: PingUnit, maxCmDistance = 500): number {
        // send pulse
        pins.setPull(15, PinPullMode.PullNone);
        pins.digitalWritePin(15, 0);
        control.waitMicros(2);
        pins.digitalWritePin(15, 1);
        control.waitMicros(10);
        pins.digitalWritePin(15, 0);

        // read pulse
        const d = pins.pulseIn(14, PulseValue.High, maxCmDistance * 58);

        switch (unit) {
            case PingUnit.Centimeters: return Math.idiv(d, 58);
            case PingUnit.Inches: return Math.idiv(d, 148);
            default: return d;
        }
    }

    let ir_inited_sn = false;
    /**
     * single-end模式配置
     */
    function sn_init_max1239() {
        let buf = pins.createBuffer(1);
        buf.setNumber(NumberFormat.UInt8BE, 0, ir_setup);
        pins.i2cWriteBuffer(MAX1239, buf);
    }
    /**
     * 配置光线传感器数据读取模式
     */
    let light_inited = false;
    function initCarLightSensorAd() {
        let buf = pins.createBuffer(2);
        buf.setNumber(NumberFormat.UInt8BE, 0, ir_setup);
        buf.setNumber(NumberFormat.UInt8BE, 1, ad_config_light);

        pins.i2cWriteBuffer(MAX1239, buf);
    }
    /**
     * 读取垂直红外遮挡传感器数值，当传感器指向深色表面时，由于红外线被吸收，反射值较低。
     */
    //% blockId="INFRARED_SENSOR_SN_READ_ACTION" block="读取 %sensor 垂直红外反射值"
    //% weight=60 blockGap=8
    //% subcategory=传感器
    export function readIrValue(sensor: IrSensor): number {
        let buf = pins.createBuffer(1);
        let dbuf = pins.createBuffer(2);
        if (!ir_inited_sn) {
            sn_init_max1239();
            ir_inited_sn = true;
        }

        switch (sensor) {
            case IrSensor.head:
                buf.setNumber(NumberFormat.UInt8BE, 0, ir_config_m);
                pins.i2cWriteBuffer(MAX1239, buf);
                dbuf = pins.i2cReadBuffer(MAX1239, 2);
                return dbuf.getNumber(NumberFormat.UInt16BE, 0) & 0xfff;
                break;
            case IrSensor.left:
                buf.setNumber(NumberFormat.UInt8BE, 0, ir_config_l);
                pins.i2cWriteBuffer(MAX1239, buf);
                dbuf = pins.i2cReadBuffer(MAX1239, 2);
                return dbuf.getNumber(NumberFormat.UInt16BE, 0) & 0xfff;
                break;
            case IrSensor.right:
                buf.setNumber(NumberFormat.UInt8BE, 0, ir_config_r);
                pins.i2cWriteBuffer(MAX1239, buf);
                dbuf = pins.i2cReadBuffer(MAX1239, 2);
                return dbuf.getNumber(NumberFormat.UInt16BE, 0) & 0xfff;
                break;
            default:
                return 0;
        }
    }

    /**
     * 读取车身周围的光线强度
     */
    //% blockId="CAR_AMBIENT_LIGHT_SENSOR" block="%pos 光线强度"
    //% weight=50 blockGap=8
    //% subcategory=传感器
    export function readSurroundingLight(pos: light_sensor): number {
        let buf = pins.createBuffer(1);
        let dbuf = pins.createBuffer(10);
        if (!light_inited) {
            initCarLightSensorAd();
            light_inited = true;
        }
        dbuf = pins.i2cReadBuffer(MAX1239, 10);

        switch (pos) {
            case light_sensor.rear_left:
                return dbuf.getNumber(NumberFormat.UInt16BE, 0) & 0xfff;
                break;
            case light_sensor.front_left:
                return dbuf.getNumber(NumberFormat.UInt16BE, 2) & 0xfff;
                break;
            case light_sensor.front:
                return dbuf.getNumber(NumberFormat.UInt16BE, 4) & 0xfff;
                break;
            case light_sensor.front_right:
                return dbuf.getNumber(NumberFormat.UInt16BE, 6) & 0xfff;
                break;
            case light_sensor.rear_right:
                return dbuf.getNumber(NumberFormat.UInt16BE, 8) & 0xfff;
                break;
            default:
                return 0;

        }

    }
}
