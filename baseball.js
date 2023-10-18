const readline = require('readline'); // 한 번에 한 줄 씩 데이터를 읽기 위한 인터페이스를 제공하는 모듈

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let targetNumber;
let usertry = 0;


function startGame() {
    targetNumber = generateRandomNumber();
    usertry = 0;
    console.log('숫자 야구 시작');
    askUserGuess();
}

function generateRandomNumber() {
    let numbers = [];

    while (numbers.length < 3) {
        const randomnum = Math.floor(Math.random() * 9) + 1;  // 1부터 9까지의 숫자
        //Math.random() - 0~1미만인 부동 소수점 반환
        //Math.floor() - 소수점 버리고 정수만 출력 
        if (!numbers.includes(randomnum)) {
            numbers.push(randomnum);
        }
    }

    return Number(numbers.join(''));
}


function askUserGuess() {
    rl.question('3자리 숫자를 입력하세요: ', (userGuess) => {
        if (userGuess.length !== 3 || isNaN(userGuess)) {
            console.log('3자리 숫자를 입력해야 합니다.');
            askUserGuess();
            return;
        }

        usertry++;
        const result = compareNumbers(userGuess, targetNumber); // 유저의 입력과 랜덤한 값 3자리를 매개변수로 받음

        console.log(`예측 숫자: ${userGuess}`);
        console.log(`결과: ${result}`);

        if (result === '3S') {
            console.log(`축하합니다! ${usertry}번째 시도에 맞추셨습니다.`);
            rl.close();
        } else {
            askUserGuess();
        }
    });
}

function compareNumbers(guess, target) {
    const targetArray = target.toString().split('').map(Number);  // 숫자를 배열로 변환

    let strikes = 0;
    let balls = 0;

    for (let i = 0; i < 3; i++) {
        if (guess[i] == targetArray[i]) {  // 타입 변환을 허용하는 비교 (=== 대신 ==)
            strikes++;
        } else if (targetArray.includes(parseInt(guess[i]))) {
            balls++;
        }
    }

    if (strikes === 3) {
        return '3S';
    }

    return `${strikes}S ${balls}B`;
}


// 게임 시작
startGame();