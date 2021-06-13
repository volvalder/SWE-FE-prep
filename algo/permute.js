function permute(nums) {
    if(nums.length < 2) {
        return [...nums];
    }

    const result = [];

    for(let i = 0; i < nums.length; i++) {
        const curNum = nums[i];
        const rest = [...nums.slice(0, i), ...nums.slice(i+1, nums.length)];
        // to exclude repeated number
        if(nums.indexOf(curNum) !== i) continue;

        for (let perm of permute(rest)) {
            result.push([curNum].concat(perm));
        }
    }
    return result;
}

console.log(permute([1,2,3]));
