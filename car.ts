
/**
 * 自定义图形块
 */
//% weight=100 color=#0fbc11 icon="\uf013"
namespace smartCar {
    //iic address of smartcar
    let CAR_ADR = 0x16;

    /**
        * smart car devices
        */
    export enum MOTORS {
        //% block="双轮"
        DDV_L_R_M = 0x60,
        //% block="左轮"
        DDV_L_M = 0x20,
        //% block="右轮"
        DDV_R_M = 0x40
    }

    /**
     * user query car device status options
     */
    export enum MOTOR_STATUS {
        //% block="左轮当前状态"
        O_LMS = 0x00,
        //% block="右轮当前状态"
        O_RMS = 0x01,
        //% block="左轮当前速度"
        O_LMSPD = 0x03,
        //% block="右轮当前速度"
        O_RMSPD = 0x03
    }

    /**
     * car indicator leds
     */
    export enum LEDS {
        //% block="车头灯"
        DDV_LED_FRONT = 0xC0,
        //% block="尾灯"
        DDV_LED_TAIL = 0x80,
        //% block="示宽灯"
        DDV_LED_SIDE = 0xA0
    }

    /**
     * on car indicator led actions
     */

    /**
    * set car action
    */
    export enum MOTOR_ACTION {
        //% block="前进"
        FOWRARD = 0X01,
        //% block="停止"
        STOP = 0x00,
        //% block="后退"
        BACKWARD = 0x02,
        //% block="加速"
        SPEED_UP = 0x04,
        //% block="减速"
        SLOW_DOWN = 0x05
    }

    /**
     * LED灯状态
     */
    export enum LED_ACTION {
        //% block="打开"
        ON = 0x01,
        //% block="关闭"
        OFF = 0x00
    }

    /**
     * 红外遮挡传感器位置
     */
    export enum IRSENSOR {
        //% block="居中"
        MIDDLE_IR = 0x09,
        //% block="左侧"
        LEFT_IR = 0x08,
        //% block="右侧"
        RIGHT_IR = 0x0A
    }

    /**
     * 读取遮挡传感器数值，返回值为0～255，无遮挡时，数值接近0，反之，接近255
     * @param sensor [0-255] 红外遮挡传感器位置
     */

    //% blockId="TEENKIT_CAR_GET_IR_SENSOR_VALUE" block="读取 %ir 遮挡传感器数据"
    //% weight=99 blockGap=12 advanced=true
    export function getIr(ir: IRSENSOR): number {
        return getReg(ir, NumberFormat.Int8BE);

    }

    /**
     * 读取小车的运行状态
     * @param opt 设备类型
     * @param format 数值长度
     */

    //% blockId="TEENKIT_CAR_GET_STATUS" block="读取工作状态%opt|数据格式 %format"
    //% weight=99 blockGap=12  advanced=true
    export function getCarStatus(opt: MOTOR_STATUS, format: NumberFormat): number {
        return getReg(opt, format);

    }


    /**
     * 设置智能小车的设备动作
     * 设置智能小车的LED动作
     * @param device is the motor type
     * @param act is action the motor to take
     * @param speed is motor drive speed range from 0~255
     */
    //% blockId="TEENKIT_CAR_ACTION_CONFIG" block="设置马达 %device|动作%act|速度 %speed"
    //% weight=60 blockGap=8
    //% speed.min=0 speed.max=255
    export function setMotorAction(device: MOTORS, act: MOTOR_ACTION, speed: number): void {
        let buf = pins.createBuffer(3);
        buf[0] = device;
        buf[1] = device &= act;
        buf[2] = DecToHex(speed % 256);
        pins.i2cWriteBuffer(CAR_ADR, buf);
    }


    /**
     * 设置智能小车的LED动作
     * @param device is the LED type
     * @param act is action the LED to take 
     */
    //% blockId="TEENKIT_CAR_LED_ACTION_CONFIG" block="指示灯 %device|%act"
    //% weight=60 blockGap
    export function setLEDAction(device: LEDS, act: LED_ACTION): void {
        let buf = pins.createBuffer(3);
        buf[0] = device;
        buf[1] = device &= act;
        pins.i2cWriteBuffer(CAR_ADR, buf);
    }

    /**
     * set reg
     */
    function setReg(reg: number, dat: number): void {
        let buf = pins.createBuffer(2);
        buf[0] = reg;
        buf[1] = dat;
        pins.i2cWriteBuffer(CAR_ADR, buf);
    }

    /**
     * get reg
     */
    function getReg(reg: number, format: NumberFormat): number {
        pins.i2cWriteNumber(CAR_ADR, reg, NumberFormat.UInt8BE);
        return pins.i2cReadNumber(CAR_ADR, format);
    }

    /**
     * convert a Dec data to Hex
     */
    function DecToHex(dat: number): number {
        return Math.idiv(dat, 10) * 16 + (dat % 10)
    }

}

