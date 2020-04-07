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
enum PU {
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

/** NEOPIXEL彩灯 */
enum CarNeoPixelColors {
    //% block=红色
    Red = 0xFF0000,
    //% block=橙色
    Orange = 0xFFA500,
    //% block=黄色
    Yellow = 0xFFFF00,
    //% block=绿色
    Green = 0x00FF00,
    //% block=蓝色
    Blue = 0x0000FF,
    //% block=靛蓝色
    Indigo = 0x4b0082,
    //% block=紫罗兰色
    Violet = 0x8a2be2,
    //% block=紫色
    Purple = 0xFF00FF,
    //% block=白色
    White = 0xFFFFFF,
    //% block=黑色
    Black = 0x000000
}
/**
 * 色彩传感器数值
 */
enum R_G_B {
    //% block=红
    RED = 1,
    //% block=绿
    GREEN = 2,
    //% block=蓝
    BLUE = 3,
    //% block=全部
    CLEAR = 4
}

/**
 * Different modes for RGB or RGB+W NeoPixel strips
 */
enum CarNeoPixelMode {
    //% block="RGB (GRB format)"
    RGB = 0,
    //% block="RGB+W"
    RGBW = 1,
    //% block="RGB (RGB format)"
    RGB_RGB = 2
}


/**
 * 阶石教育彩虹小车积木插件
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

    enum HueInterpolationDirection {
        Clockwise,
        CounterClockwise,
        Shortest
    }
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
    export function pingDistance(unit: PU, maxCmDistance = 500): number {
        // send pulse
        pins.setPull(DigitalPin.P15, PinPullMode.PullNone);
        pins.digitalWritePin(DigitalPin.P15, 0);
        control.waitMicros(2);
        pins.digitalWritePin(DigitalPin.P15, 1);
        control.waitMicros(10);
        pins.digitalWritePin(DigitalPin.P15, 0);

        // read pulse
        const d = pins.pulseIn(DigitalPin.P14, PulseValue.High, maxCmDistance * 58);

        switch (unit) {
            case PU.Centimeters: return Math.idiv(d, 58);
            case PU.Inches: return Math.idiv(d, 148);
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
    //% weight=90 blockGap=8
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
    //% weight=80 blockGap=8
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
    /**neopixel彩灯 */
    export class TeenkitCarStrip {
        buf: Buffer;
        pin: DigitalPin;
        brightness: number;
        start: number; // start offset in LED strip
        _length: number; // number of LEDs
        _mode: CarNeoPixelMode;
        _matrixWidth: number; // number of leds in a matrix - if any

        /**
         * 所有的RGB灯显示相同颜色 (输入值范围： 0-255 for r, g, b). 
         * @param rgb RGB color of the LED
         */
        //% blockId="neopixel_set_strip_color" block="%strip|显示颜色 %rgb" 
        //% weight=85 blockGap=8
        //% parts="neopixel"
        //% subcategory=灯光
        showColor(rgb: CarNeoPixelColors) {
            rgb = rgb >> 0;
            this.setAllRGB(rgb);
            ws2812b.sendBuffer(this.buf, this.pin);
        }

        private setAllRGB(rgb: number) {
            let red = unpackR(rgb);
            let green = unpackG(rgb);
            let blue = unpackB(rgb);

            const br = this.brightness;
            if (br < 255) {
                red = (red * br) >> 8;
                green = (green * br) >> 8;
                blue = (blue * br) >> 8;
            }
            const end = this.start + this._length;
            const stride = this._mode === CarNeoPixelMode.RGBW ? 4 : 3;
            for (let i = this.start; i < end; ++i) {
                this.setBufferRGB(i * stride, red, green, blue)
            }
        }

        private setBufferRGB(offset: number, red: number, green: number, blue: number): void {
            if (this._mode === CarNeoPixelMode.RGB_RGB) {
                this.buf[offset + 0] = red;
                this.buf[offset + 1] = green;
            } else {
                this.buf[offset + 0] = green;
                this.buf[offset + 1] = red;
            }
            this.buf[offset + 2] = blue;
        }


        private setAllW(white: number) {
            if (this._mode !== CarNeoPixelMode.RGBW)
                return;

            let br = this.brightness;
            if (br < 255) {
                white = (white * br) >> 8;
            }
            let buf = this.buf;
            let end = this.start + this._length;
            for (let i = this.start; i < end; ++i) {
                let ledoffset = i * 4;
                buf[ledoffset + 3] = white;
            }
        }
        private setPixelRGB(pixeloffset: number, rgb: number): void {
            if (pixeloffset < 0
                || pixeloffset >= this._length)
                return;

            let stride = this._mode === CarNeoPixelMode.RGBW ? 4 : 3;
            pixeloffset = (pixeloffset + this.start) * stride;

            let red = unpackR(rgb);
            let green = unpackG(rgb);
            let blue = unpackB(rgb);

            let br = this.brightness;
            if (br < 255) {
                red = (red * br) >> 8;
                green = (green * br) >> 8;
                blue = (blue * br) >> 8;
            }
            this.setBufferRGB(pixeloffset, red, green, blue)
        }
        private setPixelW(pixeloffset: number, white: number): void {
            if (this._mode !== CarNeoPixelMode.RGBW)
                return;

            if (pixeloffset < 0
                || pixeloffset >= this._length)
                return;

            pixeloffset = (pixeloffset + this.start) * 4;

            let br = this.brightness;
            if (br < 255) {
                white = (white * br) >> 8;
            }
            let buf = this.buf;
            buf[pixeloffset + 3] = white;
        }


        setPin(pin: DigitalPin): void {
            this.pin = pin;
            pins.digitalWritePin(this.pin, 0);
        }
        /** 
         * 更新显示
         */
        //% blockId="car_neopixel_show" block="%strip|更新显示" blockGap=8
        //% weight=79
        //% parts="neopixel"
        //% subcategory=灯光
        show() {
            ws2812b.sendBuffer(this.buf, this.pin);
        }
        /**
         * 关闭所有彩灯.
         */
        //% blockId="neopixel_clear" block="%strip|关闭"
        //% weight=76
        //% parts="neopixel"
        //% subcategory=灯光
        clear(): void {
            const stride = this._mode === CarNeoPixelMode.RGBW ? 4 : 3;
            this.buf.fill(0, this.start * stride, this._length * stride);
            this.show();
        }

        /**
        * 显示指定颜色 (range 0-255 for r, g, b). 
        * @param pixeloffset position of the NeoPixel in the strip
        * @param rgb RGB color of the LED
        */
        //% blockId="car_neopixel_set_pixel_color" block="%strip|将位置为 %pixeloffset|的灯显示为 %rgb=neopixel_colors" 
        //% blockGap=8
        //% weight=80
        //% parts="neopixel"
        //% subcategory=灯光
        setPixelColor(pixeloffset: number, rgb: number): void {
            this.setPixelRGB(pixeloffset >> 0, rgb >> 0);
            this.show();
        }

        /**
         * 顺时针旋转彩灯
         * @param 间隔数, eg: 1
         */
        //% blockId="car_neopixel_rotate" block="%strip|旋转彩灯，间隔 %offset" blockGap=8
        //% weight=39
        //% parts="neopixel"
        //% subcategory=灯光
        car_neopixel_rotate(offset: number = 1): void {
            offset = offset >> 0;
            const stride = this._mode === CarNeoPixelMode.RGBW ? 4 : 3;
            this.buf.rotate(-offset * stride, this.start * stride, this._length * stride)
            this.show();
        }
        /**
         * 设置灯带亮度，注意：仅影响后续操作。
         * @param brightness a measure of LED brightness in 0-255. eg: 255
         */
        //% blockId="car_neopixel_set_brightness" block="%strip|设置亮度 %brightness" blockGap=8
        //% weight=59
        //% parts="neopixel"
        //% brightness.min=0 brightness.max=255
        //% subcategory=灯光
        setBrightness(brightness: number): void {
            this.brightness = brightness & 0xff;
        }

        /**
         * 清除亮度
         **/
        //% blockId="car_neopixel_each_brightness" block="%strip|清除亮度" blockGap=8
        //% weight=58
        //% parts="neopixel"
        //% subcategory=灯光
        easeBrightness(): void {
            const stride = this._mode === CarNeoPixelMode.RGBW ? 4 : 3;
            const br = this.brightness;
            const buf = this.buf;
            const end = this.start + this._length;
            const mid = Math.idiv(this._length, 2);
            for (let i = this.start; i < end; ++i) {
                const k = i - this.start;
                const ledoffset = i * stride;
                const br = k > mid
                    ? Math.idiv(255 * (this._length - 1 - k) * (this._length - 1 - k), (mid * mid))
                    : Math.idiv(255 * k * k, (mid * mid));
                const r = (buf[ledoffset + 0] * br) >> 8; buf[ledoffset + 0] = r;
                const g = (buf[ledoffset + 1] * br) >> 8; buf[ledoffset + 1] = g;
                const b = (buf[ledoffset + 2] * br) >> 8; buf[ledoffset + 2] = b;
                if (stride == 4) {
                    const w = (buf[ledoffset + 3] * br) >> 8; buf[ledoffset + 3] = w;
                }
            }
        }


        /**
         * 彩灯顺时针跳动，并清除原位置的显示。
         * @param offset number of pixels to shift forward, eg: 1
         */
        //% blockId="neopixel_shift" block="%strip|移位 步长 %offset" blockGap=8
        //% weight=40
        //% parts="neopixel"
        //% subcategory=灯光
        shift(offset: number = 1): void {
            offset = offset >> 0;
            const stride = this._mode === CarNeoPixelMode.RGBW ? 4 : 3;
            this.buf.shift(-offset * stride, this.start * stride, this._length * stride)
            this.show();
        }

        /**
         * 显示彩虹灯带 
         * @param startHue the start hue value for the rainbow, eg: 1
         * @param endHue the end hue value for the rainbow, eg: 360
         */
        //% blockId="car_neopixel_set_strip_rainbow" block="%strip|彩虹灯带 from %startHue|to %endHue" 
        //% weight=85 blockGap=8
        //% parts="neopixel"
        //% subcategory=灯光
        car_neopixel_showRainbow(startHue: number = 1, endHue: number = 360) {
            if (this._length <= 0) return;

            startHue = startHue >> 0;
            endHue = endHue >> 0;
            const saturation = 100;
            const luminance = 50;
            const steps = this._length;
            const direction = HueInterpolationDirection.Clockwise;

            //hue
            const h1 = startHue;
            const h2 = endHue;
            const hDistCW = ((h2 + 360) - h1) % 360;
            const hStepCW = Math.idiv((hDistCW * 100), steps);
            const hDistCCW = ((h1 + 360) - h2) % 360;
            const hStepCCW = Math.idiv(-(hDistCCW * 100), steps);
            let hStep: number;
            if (direction === HueInterpolationDirection.Clockwise) {
                hStep = hStepCW;
            } else if (direction === HueInterpolationDirection.CounterClockwise) {
                hStep = hStepCCW;
            } else {
                hStep = hDistCW < hDistCCW ? hStepCW : hStepCCW;
            }
            const h1_100 = h1 * 100; //we multiply by 100 so we keep more accurate results while doing interpolation

            //sat
            const s1 = saturation;
            const s2 = saturation;
            const sDist = s2 - s1;
            const sStep = Math.idiv(sDist, steps);
            const s1_100 = s1 * 100;

            //lum
            const l1 = luminance;
            const l2 = luminance;
            const lDist = l2 - l1;
            const lStep = Math.idiv(lDist, steps);
            const l1_100 = l1 * 100

            //interpolate
            if (steps === 1) {
                this.setPixelRGB(0 >> 0, car_hsl(h1 + hStep, s1 + sStep, l1 + lStep) >> 0);
            } else {
                this.setPixelRGB(0 >> 0, car_hsl(startHue, saturation, luminance) >> 0);
                for (let i = 1; i < steps - 1; i++) {
                    const h = Math.idiv((h1_100 + i * hStep), 100) + 360;
                    const s = Math.idiv((s1_100 + i * sStep), 100);
                    const l = Math.idiv((l1_100 + i * lStep), 100);
                    this.setPixelColor(i, car_hsl(h, s, l));
                }
                this.setPixelRGB((steps - 1) >> 0, car_hsl(endHue, saturation, luminance) >> 0);
            }
            this.show();
        }


    }
    // end Class Strip
    function packRGB(a: number, b: number, c: number): number {
        return ((a & 0xFF) << 16) | ((b & 0xFF) << 8) | (c & 0xFF);
    }
    function unpackR(rgb: number): number {
        let r = (rgb >> 16) & 0xFF;
        return r;
    }
    function unpackG(rgb: number): number {
        let g = (rgb >> 8) & 0xFF;
        return g;
    }
    function unpackB(rgb: number): number {
        let b = (rgb) & 0xFF;
        return b;
    }

    /**
     * 初始化彩虹智能小车地盘氛围灯
     */
    //% blockId="car_bottom_neopixel_create" block="初始化底盘分为彩灯，模式 %mode"
    //% weight=90 blockGap=8
    //% parts="neopixel"
    //% trackArgs=0,2
    //% blockSetVariable=strip
    //% subcategory=灯光
    export function createBottomRGBStrip(mode: CarNeoPixelMode): TeenkitCarStrip {
        let strip = new TeenkitCarStrip();
        let stride = mode === CarNeoPixelMode.RGBW ? 4 : 3;
        strip.buf = pins.createBuffer(6 * stride);
        strip.start = 0;
        strip._length = 6;
        strip._mode = mode;
        strip._matrixWidth = 0;
        strip.setBrightness(255)
        strip.setPin(DigitalPin.P12)
        //clear all
        strip.clear();
        return strip;
    }

    /**
     * 初始化彩虹智能小车2个车头灯
     */
    //% blockId="car_head_neopixel_create" block="初始化车头灯，模式 %mode"
    //% weight=89 blockGap=8
    //% parts="neopixel"
    //% trackArgs=0,2
    //% blockSetVariable=strip2
    //% subcategory=灯光
    export function createHeadRGBStrip(mode: CarNeoPixelMode): TeenkitCarStrip {
        let strip = new TeenkitCarStrip();
        let stride = mode === CarNeoPixelMode.RGBW ? 4 : 3;
        strip.buf = pins.createBuffer(2 * stride);
        strip.start = 0;
        strip._length = 2;
        strip._mode = mode;
        strip._matrixWidth = 0;
        strip.setBrightness(255)
        strip.setPin(DigitalPin.P16)
        //clear all
        strip.clear();
        return strip;
    }


    /**
     * 调光
     * @param h hue from 0 to 360
     * @param s saturation from 0 to 99
     * @param l luminosity from 0 to 99
     */
    //% blockId=neopixelHSL block="色调 %h|饱和度 %s|亮度 %l"
    //% h.min=0 h.max=360
    //% s.min=0 s.max=99
    //% l.min=0 l.max=99
    //% blockSetVariable=strip
    //% subcategory=灯光
    export function car_hsl(h: number, s: number, l: number): number {
        h = Math.round(h);
        s = Math.round(s);
        l = Math.round(l);

        h = h % 360;
        s = Math.clamp(0, 99, s);
        l = Math.clamp(0, 99, l);
        let c = Math.idiv((((100 - Math.abs(2 * l - 100)) * s) << 8), 10000); //chroma, [0,255]
        let h1 = Math.idiv(h, 60);//[0,6]
        let h2 = Math.idiv((h - h1 * 60) * 256, 60);//[0,255]
        let temp = Math.abs((((h1 % 2) << 8) + h2) - 256);
        let x = (c * (256 - (temp))) >> 8;//[0,255], second largest component of this color
        let r$: number;
        let g$: number;
        let b$: number;
        if (h1 == 0) {
            r$ = c; g$ = x; b$ = 0;
        } else if (h1 == 1) {
            r$ = x; g$ = c; b$ = 0;
        } else if (h1 == 2) {
            r$ = 0; g$ = c; b$ = x;
        } else if (h1 == 3) {
            r$ = 0; g$ = x; b$ = c;
        } else if (h1 == 4) {
            r$ = x; g$ = 0; b$ = c;
        } else if (h1 == 5) {
            r$ = c; g$ = 0; b$ = x;
        }
        let m = Math.idiv((Math.idiv((l * 2 << 8), 100) - c), 2);
        let r = r$ + m;
        let g = g$ + m;
        let b = b$ + m;
        return packRGB(r, g, b);
    }

    /**
    * 调色器：将颜色通道转换为RGB色彩
    * @param red value of the red channel between 0 and 255. eg: 255
    * @param green value of the green channel between 0 and 255. eg: 255
    * @param blue value of the blue channel between 0 and 255. eg: 255
    */
    //% weight=1
    //% blockId="car_neopixel_rgb" block="红 %red|绿 %green|蓝 %blue"
    //% red.min=0 red.max=255
    //% green.min=0 green.max=255
    //% blue.min=0 blue.max=255
    //% subcategory=灯光
    export function car_rgb(red: number, green: number, blue: number): number {
        return packRGB(red, green, blue);
    }

    /**
     * Gets the RGB value of a known color
    */
    //% weight=2 blockGap=8
    //% blockId="neopixel_colors" block="%color"
    //% subcategory=灯光
    export function colors(color: CarNeoPixelColors): number {
        return color;
    }


    /** 色彩传感器 */
    enum LCS_Constants {
        // Constants
        ADDRESS = 0x29,
        ID = 0x12, // Register should be equal to 0x44 for the TCS34721 or TCS34725, or 0x4D for the TCS34723 or TCS34727.

        COMMAND_BIT = 0x80,

        ENABLE = 0x00,
        ENABLE_AIEN = 0x10, // RGBC Interrupt Enable
        ENABLE_WEN = 0x08, // Wait enable - Writing 1 activates the wait timer
        ENABLE_AEN = 0x02, // RGBC Enable - Writing 1 actives the ADC, 0 disables it
        ENABLE_PON = 0x01, // Power on - Writing 1 activates the internal oscillator, 0 disables it
        ATIME = 0x01, // Integration time
        WTIME = 0x03, // Wait time (if ENABLE_WEN is asserted)
        AILTL = 0x04, // Clear channel lower interrupt threshold
        AILTH = 0x05,
        AIHTL = 0x06, // Clear channel upper interrupt threshold
        AIHTH = 0x07,
        PERS = 0x0C, // Persistence register - basic SW filtering mechanism for interrupts
        PERS_NONE = 0x00, // Every RGBC cycle generates an interrupt
        PERS_1_CYCLE = 0x01, // 1 clean channel value outside threshold range generates an interrupt
        PERS_2_CYCLE = 0x02, // 2 clean channel values outside threshold range generates an interrupt
        PERS_3_CYCLE = 0x03, // 3 clean channel values outside threshold range generates an interrupt
        PERS_5_CYCLE = 0x04, // 5 clean channel values outside threshold range generates an interrupt
        PERS_10_CYCLE = 0x05, // 10 clean channel values outside threshold range generates an interrupt
        PERS_15_CYCLE = 0x06, // 15 clean channel values outside threshold range generates an interrupt
        PERS_20_CYCLE = 0x07, // 20 clean channel values outside threshold range generates an interrupt
        PERS_25_CYCLE = 0x08, // 25 clean channel values outside threshold range generates an interrupt
        PERS_30_CYCLE = 0x09, // 30 clean channel values outside threshold range generates an interrupt
        PERS_35_CYCLE = 0x0A, // 35 clean channel values outside threshold range generates an interrupt
        PERS_40_CYCLE = 0x0B, // 40 clean channel values outside threshold range generates an interrupt
        PERS_45_CYCLE = 0x0C, // 45 clean channel values outside threshold range generates an interrupt
        PERS_50_CYCLE = 0x0D, // 50 clean channel values outside threshold range generates an interrupt
        PERS_55_CYCLE = 0x0E, // 55 clean channel values outside threshold range generates an interrupt
        PERS_60_CYCLE = 0x0F, // 60 clean channel values outside threshold range generates an interrupt
        CONFIG = 0x0D,
        CONFIG_WLONG = 0x02, // Choose between short and long (12x) wait times via WTIME
        CONTROL = 0x0F, // Set the gain level for the sensor
        STATUS = 0x13,
        STATUS_AINT = 0x10, // RGBC Clean channel interrupt
        STATUS_AVALID = 0x01, // Indicates that the RGBC channels have completed an integration cycle

        CDATAL = 0x14, // Clear channel data
        CDATAH = 0x15,
        RDATAL = 0x16, // Red channel data
        RDATAH = 0x17,
        GDATAL = 0x18, // Green channel data
        GDATAH = 0x19,
        BDATAL = 0x1A, // Blue channel data
        BDATAH = 0x1B,

        GAIN_1X = 0x00, //  1x gain
        GAIN_4X = 0x01, //  4x gain
        GAIN_16X = 0x02, // 16x gain
        GAIN_60X = 0x03  // 60x gain
    }

    let LCS_integration_time_val = 0

    export class TCS34725 {

        // I2C functions

        I2C_WriteReg8(addr: number, reg: number, val: number) {
            let buf = pins.createBuffer(2)
            buf.setNumber(NumberFormat.UInt8BE, 0, reg)
            buf.setNumber(NumberFormat.UInt8BE, 1, val)
            pins.i2cWriteBuffer(addr, buf)
        }

        I2C_ReadReg8(addr: number, reg: number): number {
            let buf = pins.createBuffer(1)
            buf.setNumber(NumberFormat.UInt8BE, 0, reg)
            pins.i2cWriteBuffer(addr, buf)
            buf = pins.i2cReadBuffer(addr, 1)
            return buf.getNumber(NumberFormat.UInt8BE, 0);
        }

        I2C_ReadReg16(addr: number, reg: number): number {
            let buf = pins.createBuffer(1)
            buf.setNumber(NumberFormat.UInt8BE, 0, reg)
            pins.i2cWriteBuffer(addr, buf)
            buf = pins.i2cReadBuffer(addr, 2)
            // Little endian
            return ((buf.getNumber(NumberFormat.UInt8BE, 1) << 8) | buf.getNumber(NumberFormat.UInt8BE, 0));
        }


        LCS_initialize() {
            // Make sure we're connected to the right sensor.
            let chip_id = this.I2C_ReadReg8(LCS_Constants.ADDRESS, (LCS_Constants.COMMAND_BIT | LCS_Constants.ID))

            if (chip_id != 0x44) {
                return // Incorrect chip ID
            }

            // Set default integration time and gain.
            this.LCS_set_integration_time(0.0048)
            this.LCS_set_gain(LCS_Constants.GAIN_16X)

            // Enable the device (by default, the device is in power down mode on bootup).
            this.LCS_enable()
        }

        LCS_enable() {
            // Set the power and enable bits.
            this.I2C_WriteReg8(LCS_Constants.ADDRESS, (LCS_Constants.COMMAND_BIT | LCS_Constants.ENABLE), LCS_Constants.ENABLE_PON)
            basic.pause(10) // not sure if this is right    time.sleep(0.01) // FIXME delay for 10ms

            this.I2C_WriteReg8(LCS_Constants.ADDRESS, (LCS_Constants.COMMAND_BIT | LCS_Constants.ENABLE), (LCS_Constants.ENABLE_PON | LCS_Constants.ENABLE_AEN))
        }

        LCS_set_integration_time(time: number) {
            let val = 0x100 - (time / 0.0024) // FIXME was cast to int type
            if (val > 255) {
                val = 255
            } else if (val < 0) {
                val = 0
            }
            this.I2C_WriteReg8(LCS_Constants.ADDRESS, (LCS_Constants.COMMAND_BIT | LCS_Constants.ATIME), val)
            LCS_integration_time_val = val
        }

        LCS_set_gain(gain: number) {
            this.I2C_WriteReg8(LCS_Constants.ADDRESS, (LCS_Constants.COMMAND_BIT | LCS_Constants.CONTROL), gain)
        }


        LCS_set_led_state(state: boolean) {
            this.I2C_WriteReg8(LCS_Constants.ADDRESS, (LCS_Constants.COMMAND_BIT | LCS_Constants.PERS), LCS_Constants.PERS_NONE)
            let val = this.I2C_ReadReg8(LCS_Constants.ADDRESS, (LCS_Constants.COMMAND_BIT | LCS_Constants.ENABLE))
            if (state) {
                val |= LCS_Constants.ENABLE_AIEN
            } else {
                val &= ~LCS_Constants.ENABLE_AIEN
            }
            this.I2C_WriteReg8(LCS_Constants.ADDRESS, (LCS_Constants.COMMAND_BIT | LCS_Constants.ENABLE), val)

            basic.pause(2 * (256 - LCS_integration_time_val) * 2.4) // delay for long enough for there to be new (post-change) complete values available
        }


        //% blockId="colorType" block="颜色 %colorType"
        //% weight=67 blockGap=8
        //% subcategory=传感器
        colorType(colorType: R_G_B): R_G_B {
            return colorType;
        }

        /**
        * 从色彩传感器读取颜色值 
        * @param tp 指定读取的RGB颜色类型
        */
        //% blockId="GET_COLOR_SENSOR_R_G_B_DATA" block="读取RGB值 %tp"
        //% weight=69 blockGap=8
        //% subcategory=传感器
        getColorData(tp: R_G_B): number {
            basic.pause((256 - LCS_integration_time_val) * 2.4);
            let sum = this.I2C_ReadReg16(LCS_Constants.ADDRESS, (LCS_Constants.COMMAND_BIT | LCS_Constants.CDATAL));
            let vue = 0;
            switch (tp) {
                case R_G_B.RED:
                    vue = this.I2C_ReadReg16(LCS_Constants.ADDRESS, (LCS_Constants.COMMAND_BIT | LCS_Constants.RDATAL));

                    break;
                case R_G_B.GREEN:
                    vue = this.I2C_ReadReg16(LCS_Constants.ADDRESS, (LCS_Constants.COMMAND_BIT | LCS_Constants.GDATAL));

                    break;
                case R_G_B.BLUE:
                    vue = this.I2C_ReadReg16(LCS_Constants.ADDRESS, (LCS_Constants.COMMAND_BIT | LCS_Constants.BDATAL));

                    break;
                case R_G_B.CLEAR:
                    return sum;
                    break;

            }
            vue = Math.floor(vue / sum * 255);

            return vue;
        }


        LCS_get_raw_data(delay: boolean = false): number[] {
            if (delay) {
                // Delay for the integration time to allow reading immediately after the previous read.
                basic.pause((256 - LCS_integration_time_val) * 2.4)
            }

            let div = (256 - LCS_integration_time_val) * 1024
            let rgbc = [0, 0, 0, 0]
            rgbc[0] = this.I2C_ReadReg16(LCS_Constants.ADDRESS, (LCS_Constants.COMMAND_BIT | LCS_Constants.RDATAL)) / div
            rgbc[1] = this.I2C_ReadReg16(LCS_Constants.ADDRESS, (LCS_Constants.COMMAND_BIT | LCS_Constants.GDATAL)) / div
            rgbc[2] = this.I2C_ReadReg16(LCS_Constants.ADDRESS, (LCS_Constants.COMMAND_BIT | LCS_Constants.BDATAL)) / div
            rgbc[3] = this.I2C_ReadReg16(LCS_Constants.ADDRESS, (LCS_Constants.COMMAND_BIT | LCS_Constants.CDATAL)) / div
            if (rgbc[0] > 1) {
                rgbc[0] = 1
            }
            if (rgbc[1] > 1) {
                rgbc[1] = 1
            }
            if (rgbc[2] > 1) {
                rgbc[2] = 1
            }
            if (rgbc[3] > 1) {
                rgbc[3] = 1
            }
            return rgbc
        }
    }

    //% blockId="initialize_sensor" block="开启颜色传感器"
    //% weight=70 blockGap=8
    //% subcategory=传感器
    export function init_color_sensor(): void {
        let csr = new TCS34725();
        csr.LCS_initialize();

        //补光灯
        let al = new TeenkitCarStrip();
        let stride = CarNeoPixelMode.RGB;
        al.buf = pins.createBuffer(4 * stride);
        al.start = 0;
        al._length = 4;
        al._mode = CarNeoPixelMode.RGB;
        al._matrixWidth = 0;
        al.setBrightness(255)
        al.setPin(DigitalPin.P13)

        al.showColor(CarNeoPixelColors.White);

    }
}
