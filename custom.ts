/**
 * Rainbow programable smart car
 * 彩虹可编程智能小车
 * 重庆润颐科技有限公司
 * www.rootbrother.com
 */
enum MOTORS {
    //% block="左轮"
    left,
    //% block="右轮"
    right
}

enum MOTOR_MOTION {
    //% block="自由运动"
    coast = 0,
    //% block="倒车"
    reverse = 1,
    //% block="前进"
    forward = 2,
    //% block="刹车"
    brake = 3
}

/**
 * 自定义图形块
 */
//% weight=100 color=#0fbc11 icon="\uf013"
namespace smartcar {
    enum MOTORS_WRITE {
        left = 0xC0,
        right = 0xC2
    }
    enum MOTORS_READ {
        left = 0xC1,
        right = 0xC3
    }
    let Motor_speed = [0x05,0x06, 0x07, 0x08, 0x09, 0x0A, 0x0B, 0x0C, 0x0D, 0x0E, 0x0F, 0x10, 0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17, 0x18, 0x19, 0x1A, 0x1B, 0x1C, 0x1D, 0x1E, 0x1F, 0x20, 0x21, 0x22, 0x23, 0x24, 0x25, 0x26, 0x27, 0x28, 0x29, 0x2A, 0x2B, 0x2C, 0x2D, 0x2E, 0x2F, 0x30, 0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39, 0x3A, 0x3B, 0x3C, 0x3D, 0x3E, 0x3F];

    /**
     * set reg
     */
    function setReg(dev: MOTORS,reg: number, dat: number): void {
        let buf = pins.createBuffer(2);
        buf[0] = reg;
        buf[1] = dat;
        pins.i2cWriteBuffer(dev, buf);
    }

    /**
     * get reg
     */
    function getReg(dev: MOTORS,reg: number, format: NumberFormat): number {
        pins.i2cWriteNumber(dev, reg, NumberFormat.UInt8BE);
        return pins.i2cReadNumber(dev, format);
    }

    /**
     * convert a Dec data to Hex
     */
    function DecToHex(dat: number): number {
        return Math.idiv(dat, 10) * 16 + (dat % 10)
    }

    /**
     * 设置智能小车的运动
     * 
     * @param device is the motor type
     * @param act is action the motor to take
     * @param speed is motor drive speed range from 0~255
     */
    //% blockId="TEENKIT_CAR_ACTION_CONFIG" block="设置马达 %dev|动作%act|速度 %speed"
    //% weight=60 blockGap=8
    //% speed.min=0 speed.max=59
    export function setMotorAction(dev: MOTORS, act: MOTOR_MOTION, speed: number): void {
        basic.showNumber(speed);
        let device = MOTORS_WRITE.left;
        switch(dev){
            case MOTORS.left:
                device = MOTORS_WRITE.left;
                break;
            case MOTORS.right:
                device = MOTORS_WRITE.right;
                break;
        }
        basic.showNumber(device);
        let buf = pins.createBuffer(3);
        let spd = Motor_speed[speed] << 2;

        buf[0] = spd | act;

        pins.i2cWriteBuffer(device, buf);

        basic.showNumber(device);
        basic.showNumber(buf[0]);
    } 
}
