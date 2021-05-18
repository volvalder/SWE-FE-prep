  
/**
*  This is a simplified implementation of Array.prototype.flat
*  Note that usage of Array.prototype is bad practice,
*  it can intersect with someone's else code, I am using it for easier testing.
*  HOWTO: [1,2,3,[4,5,[6,7]]].flatten(2)
*/

Array.prototype.flatten = function flatten(depth = -1, nestedArr = null, hop = 0, result = []) {
    if (isNaN(depth)) {
        throw new Error('Please use only a positive numbers for depth');
    }
    // In case if float is given as arg
    depth = Math.floor(depth);

    let arr = nestedArr || this;

    for (let val of arr) {
        if (Array.isArray(val) && hop != depth) {
            result = flatten(depth, val, hop+1, result);
        } else {
            result.push(val)
        }
    }

    return result;
}
