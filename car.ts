



/**
 * 自定义图形块
 */
//% weight=100 color=#0fbc11 icon="\uf013"
namespace smartCar {
    //iic address of write device
    let DEV_W_ADR = 0x2c;
    //iic address of device read
    let DEV_R_ADR = 0x16;
    //状态地址
    let left_motor_status = 0x00;
    let right_motor_status = 0x01;
    let left_motor_speed = 0x02;
    let right_motor_speed = 0x03;

/**
 * user query car device status options
 */
    export enum  options{
        //% block="左轮状态"
        LMS = 0x00,
        //% block="右轮状态"
        RMS = 0x01,
        //% block="左轮当前速度"
        LMSPD = 0x02,
        //% block="右轮当前速度"
        RMSPD = 0x03
    }
    /**
    * smart car devices
    */
    export enum devices{
        //% block="左轮"
        L_M = 0x20,
        //% block="右轮"
        R_M = 0x40,
        //% block="双轮"
        L_R_M = 0x60
    }
    
    /**
    * set car action
    */
    export enum action{
        //% block="停止"
        STOP = 0x00,
        //% block="前进"
        FOWRARD = 0X01,
        //% block="后退"
        BACKWARD =  0x02,
        //% block="加速"
        SPEED_UP = 0x04,
        //% block="减速"
        SLOW_DOWN = 0x05
    }
    /**
     * 读取小车的状态
     * @param value 在此处描述”值“, eg: 5
     */
    //% block
    export function getStatus(opt: options): number {
        return getReg(opt);
        
    }
    
    /**
     * 设置智能小车的设备动作
     * @param left is the action the left motor to do
     * @param right is action the right motor to do 
     */
    //% blockId="TEENKIT_CAR_ACTION_CONFIG" block="设置 左轮 %left|右轮 %right"
    //% weight=60 blockGap
    export function action(left: action, right: action): void {
        let buf = pins.createBuffer(8);
        buf[0] = devices.L_M;
        buf[1] = devices.L_M &= left;
        pins.i2cWriteBuffer(DEV_W_ADR, buf);
        
        buf[0] = devices.R_M;
        buf[1] = devices.R_M &= right;
        pins.i2cWriteBuffer(DEV_W_ADR, buf);
    }

    /**
     * set reg
     */
    function setReg(reg: number, dat: number): void {
        let buf = pins.createBuffer(2);
        buf[0] = reg;
        buf[1] = dat;
        pins.i2cWriteBuffer(DEV_W_ADR, buf);
    }

    /**
     * get reg
     */
    function getReg(reg: number): number {
        pins.i2cWriteNumber(DEV_R_ADR, reg, NumberFormat.UInt8BE);
        return pins.i2cReadNumber(DEV_R_ADR, NumberFormat.UInt8BE);
    }

}
