
/**
 * MAX1239EEE+ ADC(数模转换)
 * ain0: 左遮挡
 * ain1: 前遮挡
 * ain2: 右遮挡
 * 
 * ain3: 左后光敏
 * ain4: 左前光敏
 * ain5: 前光敏
 * ain6: 右前光敏
 * ain7: 右后光敏
 */

enum MyEnum {
    //% block="one"
    One,
    //% block="two"
    Two
}


//% weight=100 color=#0fbc11 icon="\uf013"
namespace smartcar {
    let MAX1399 = 0x35;
    /**
     * setup字节，配置为：11110010。即： 使用内部参考电压，并保持参考电压开启
     */
    let setup_byte = 0xf2;
    /**
     * config字节，配置为： 01010101。 即采取从AIN6扫描到AIN10的扫描模式，和single-end的转换模式
     * TODO： 电路上需要对遮挡传感器和光敏电阻进行分组，此配置需要修改，并本别为两种传感器分组。
     */
    let config_byte = 0x55;

    /**
     * 只读取AIN0的配置:01100001
     */
    let config_ain1 = 0x71;
    /**
     * init infrared block sensor and light sensor
     */
    //% blockId="INFRARED_LIGHT_INITIALIZATION" block="初始化遮挡传感器和光敏传感"
    //% weight=60 blockGap=8
    export function init_max1239() {
        let buf = pins.createBuffer(2);
        buf.setNumber(NumberFormat.UInt8BE, 0, setup_byte);
        buf.setNumber(NumberFormat.UInt8BE, 1, config_byte);
        pins.i2cWriteBuffer(MAX1399, buf);

        serial.writeLine("max1399 initialized");
    }

    //% blockId="INFRARED_LIGHT_READ" block="读取全部数据"
    //% weight=61 blockGap=8
    export function read() {
        let buf = pins.createBuffer(8);

        for (; ;) {
            buf = pins.i2cReadBuffer(MAX1399, 10);

            // let i1 = buf.getNumber(NumberFormat.UInt16BE, 0) & 0xfff;
            // let i2 = buf.getNumber(NumberFormat.UInt16BE, 2) & 0xfff;
            // let i3 = buf.getNumber(NumberFormat.UInt16BE, 4) & 0xfff;

            let l1 = buf.getNumber(NumberFormat.UInt16BE, 0) & 0xfff;
            let l2 = buf.getNumber(NumberFormat.UInt16BE, 2) & 0xfff;
            let l3 = buf.getNumber(NumberFormat.UInt16BE, 4) & 0xfff;
            let l4 = buf.getNumber(NumberFormat.UInt16BE, 6) & 0xfff;
            let l5 = buf.getNumber(NumberFormat.UInt16BE, 8) & 0xfff;

            serial.writeLine( l1 + " " + l2 + " " + l3 + " " + l4 + " " + l5);

            basic.pause(100);
        }



    }

    /**
        * set reg
        */
    function setReg(dev: number, reg: number, dat: number): void {
        let buf = pins.createBuffer(2);
        buf.setNumber(NumberFormat.UInt8BE, 0, reg);
        buf.setNumber(NumberFormat.UInt8BE, 1, dat);
        pins.i2cWriteBuffer(dev, buf);
    }

    /**
     * get reg
     */
    function getReg8(dev: number, reg: number, format: NumberFormat): number {
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

}
