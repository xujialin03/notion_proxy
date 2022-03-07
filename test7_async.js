function takeLongTime() {
    return new Promise(resolve => {
        setTimeout(() => resolve("long_time_value"), 1000);
    });
}

async function test() {
    
    const v = await takeLongTime();
    console.log(v);
    console.log("这个才是最后执行");
}

takeLongTime().then(re=>{
    console.log(re);
    console.log("这个才是最后执行1");
})