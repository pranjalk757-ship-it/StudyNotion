const convertSecondToDuration = (totalDurationInSecond)=>{
    const hours = Math.floor((totalDurationInSecond/3600));
    const minutes = Math.floor((totalDurationInSecond%3600)/60);
    const seconds = Math.floor((totalDurationInSecond%3600)%60);

    if(hours>0){
        return `${hours} hrs  ${ninutes} mins`
    }
    if(minutes > 0){
        return `${minutes} mins ${seconds} sec`
    }
    else{
        return `${seconds} sec`
    }

}

module.exports = {
    convertSecondToDuration
}