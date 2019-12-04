
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
        L_R_M = 0x60,
        //% block="左轮"
        L_M = 0x20,
        //% block="右轮"
        R_M = 0x40
    }


    /**
     * user query car device status options
     */
    export enum MOTOR_STATUS {
        //% block="当前速度"
        SPD = 0x03
    }

    /**
     * car indicator leds
     */
    export enum LEDS {
        //% block="车头灯"
        LED_FRONT = 0xC0,
        //% block="尾灯"
        LED_TAIL = 0x80,
        //% block="示宽灯"
        LED_SIDE = 0xA0
    }

    /**
     * on car indicator led actions
     */

    /**
    * set car action
    */
    export enum MOTOR_ACTION {
        //% block="前进"
        FOWRARD = 0x01,
        //% block="停止"
        STOP = 0x00,
        //% block="后退"
        BACKWARD = 0x02,
        //% block="加速"
        SPEED_UP = 0x04,
        //% block="减速"
        SLOW_DOWN = 0x05,
        //% block="右转"
        RIGHT_TURN = 0x06,
        //% block="左转"
        LEFT_TURN = 0x07,
        //% block="重置速度"
        RESET_SPEED = 0x03
    }

    /**
     * 尾灯LED灯状态
     */
    export enum TAIL_LED_ACTION {
        //% block="打开"
        T_ON = 0x08,
        //% block="关闭"
        T_OFF = 0x09
    }

    /**
     * 示宽灯动作
     */
    export enum SIDE_LED_ACTION {
        //% block="打开"
        S_ON = 0x0A,
        //% block="关闭"
        S_OFF = 0x0B
    }

    /**
     * 大灯动作
     */
    export enum HEAD_LED_ACTION {
        //% block="打开"
        H_ON = 0x0C,
        //% block="关闭"
        H_OFF = 0x0D
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
     * 马达工作状态：0=stop;1=forward;2=backward
     */
    export enum MOTOR_STATUS {
        //% block="左轮"
        L_M_S = 0x00,
        //% block="右轮"
        R_M_S = 0x01
    }

    export enum MOTOR_SPEED {
        //% block="左轮速度"
        L_M_SPD = 0x02,
        //% block="右轮速度"
        R_M_SPD = 0x03,
        //% block="左轮增加量"
        L_M_INC = 0x04,
        //% block="右轮增加量"
        R_M_INC = 0x05,
        //% block="左轮减少量"
        L_M_DEC = 0x06,
        //% block="左轮减少量"
        R_M_DEC = 0x07
    }

    const BATTERY = 0x0B

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

    //% blockId="TEENKIT_CAR_GET_STATUS" block="读取%dev|工作状态"
    //% weight=99 blockGap=12  advanced=true
    export function getCarStatus(opt: MOTOR_STATUS): number {
        return getReg(opt, NumberFormat.Int8LE);

    }


    /**
     * 设置智能小车的运动
     * 
     * @param device is the motor type
     * @param act is action the motor to take
     * @param speed is motor drive speed range from 0~255
     */
    //% blockId="TEENKIT_CAR_ACTION_CONFIG" block="设置马达 %device|动作%act|速度 %speed"
    //% weight=60 blockGap=8
    //% speed.min=0 speed.max=255
    export function setMotorAction(device: MOTORS, act: MOTOR_ACTION, speed: number): void {
        let buf = pins.createBuffer(3);
        buf[0] = device | act;

        buf[2] = DecToHex(speed % 256);
        pins.i2cWriteBuffer(CAR_ADR, buf);
    }


    /**
     * 开关车头灯
     * 
     * @param act is action the LED to take 
     */
    //% blockId="TEENKIT_CAR_HEAD_LED_ACTION_CONFIG" block="车头灯 %act"
    //% weight=60 blockGap
    export function setHeadLEDAction(act: HEAD_LED_ACTION): void {
        let buf = pins.createBuffer(3);
        buf[0] = 0xC0 | act;

        pins.i2cWriteBuffer(CAR_ADR, buf);
    }

    /**
     * 开关示宽灯
     * 
     * @param act is action the LED to take 
     */
    //% blockId="TEENKIT_CAR_SIDE_LED_ACTION_CONFIG" block="示宽灯 %act"
    //% weight=60 blockGap
    export function setSideLEDAction(act: SIDE_LED_ACTION): void {
        let buf = pins.createBuffer(3);
        buf[0] = 0xA0 | act;

        pins.i2cWriteBuffer(CAR_ADR, buf);
    }

    /**
     * 开关尾灯
     * 
     * @param act is action the LED to take 
     */
    //% blockId="TEENKIT_CAR_SIDE_LED_ACTION_CONFIG" block="尾灯 %act"
    //% weight=60 blockGap
    export function setTailLEDAction(act: TAIL_LED_ACTION): void {
        let buf = pins.createBuffer(3);
        buf[0] = 0x80 | act;

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

