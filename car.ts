
/**
 * 自定义图形块
 */
//% weight=100 color=#0fbc11 icon="\uf013"
namespace smartCar {
    //iic address of smartcar
    let CAR_ADR = 0x16;
    
    /**
     * user query car device status options
     */
    export enum options {
        //% block="左轮状态"
        O_LMS = 0x00,
        //% block="右轮状态"
        O_RMS = 0x01,
        //% block="左轮当前速度"
        O_LMSPD = 0x02,
        //% block="右轮当前速度"
        O_RMSPD = 0x03
    }
    /**
    * smart car devices
    */
    export enum devices {
        //% block="左轮"
        DDV_L_M = 0x20,
        //% block="右轮"
        DDV_R_M = 0x40,
        //% block="双轮"
        DDV_L_R_M = 0x60
    }

    /**
    * set car action
    */
    export enum action_type {
        //% block="停止"
        STOP = 0x00,
        //% block="前进"
        FOWRARD = 0X01,
        //% block="后退"
        BACKWARD = 0x02,
        //% block="加速"
        SPEED_UP = 0x04,
        //% block="减速"
        SLOW_DOWN = 0x05
    }
    /**
     * 读取小车的状态
     * @param value 在此处描述”值“, eg: 5
     */
    //% block = "读取工作状态"
    export function getCarStatus(opt: options, format: NumberFormat): number {
        return getReg(opt,format);

    }

    /**
     * 设置智能小车的设备动作
     * @param left is the action the left motor to do
     * @param right is action the right motor to do 
     */
    //% blockId="TEENKIT_CAR_ACTION_CONFIG" block="设置 %device|%left|右轮 %right"
    //% weight=60 blockGap
    export function setaction(device: devices, act: action_type, speed: number): void {
        let buf = pins.createBuffer(3);
        buf[0] = device;
        buf[1] = device &= act;
        buf[2] = speed % 256;
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
    function getReg(reg: number,format: NumberFormat): number {
        pins.i2cWriteNumber(CAR_ADR, reg, NumberFormat.UInt8BE);
        return pins.i2cReadNumber(CAR_ADR, format);
    }

}
 
