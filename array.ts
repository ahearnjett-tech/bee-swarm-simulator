let currentArrayValue = 0
let valueFound = false

namespace arrays {

    //% array.shadow=variables_get
    //% array.defl=list
    //% block="$array=variables_get includes $value"
    //% group="Read"
    export function includes(array: any[], value: any) {
        for (let index = 0; index < array.length; index++) {
            if (array[currentArrayValue] == value) {
                valueFound = true
            }
            currentArrayValue += 1
        }
        return valueFound;
    }

}