// 新加
export class MyClass{
    async inc(count) {
        for (let i = 0; i<10000; i++){
            for(let j = 0; j<30000; j++){
                count += i+j
            }
        }
        return count;
    }
}