///////////////////////////////////////
const readline = require('readline'); // 한 번에 한 줄 씩 데이터를 읽기 위한 인터페이스를 제공하는 모듈

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout                             //  사용자 입력 받기
});

///////////////////////////////////////  

let targetNumber; // 컴퓨터가 만든 랜덤한 수 3자리  /  generateRandomNumber() 참조
let usertry = 0; // 도전한 횟수 / askUserGuess() 함수 참조


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
            numbers.push(randomnum);   // 만든 숫자를 numbers배열에 추가
        }
    }

    return Number(numbers.join(''));  // Number()로 int값으로 변환
}


function askUserGuess() {     //   숫자를 입력받고, 입력값에 대한 오류 해결 함수
    rl.question('3자리 숫자를 입력하세요: ', (userGuess) => {
        if (userGuess.length !== 3 || isNaN(userGuess)) {
            console.log('3자리 숫자를 입력해야 합니다.');
            askUserGuess();
            return;
        }

        usertry++;       //  입력을 할때마다 usertry가 1씩 늘어남
        const result = compareNumbers(userGuess, targetNumber); // 유저의 입력과 랜덤한 값 3자리를 매개변수로 받음

        console.log(`예측 숫자: ${userGuess}`); // `` 백틱으로 javascript문법을 문자열 사이에 넣음
        console.log(`결과: ${result}`); // result 는 compaerNumbers()함수이며, 47번 line 참조

        if (result === '3S') {      // 만약 3개 전부가 맞았다면, 3스트라이크 
            console.log(`축하합니다! ${usertry}번째 시도에 맞추셨습니다.`);  // 몇번시도했는지 출력
            rl.close();
        } else {
            askUserGuess();  //     52번 라인의 if문이 틀렸을때, askUserGuess()함수가 처음부터 시작됨
        }
    });
}

// .toString()  = 숫자를 문자열로 변환시킬때 사용
// .split()  = 지정된 구분자를 기준으로 나눠서 배열로 출력해줌.
// .map() = 배열의 각 요소에 대해 특정 동작을 수행하여 새로운 배열을 생성할 때 사용


function compareNumbers(guess, target) {   // guess와 target은 숫자열
    const targetArray = target.toString().split('').map(Number);  // targetArray에 target 숫자열을 문자열로 변환하고 각 자릿수를 배열로 만듦.
    // 이를 위해 toString() 및 split('') 메소드를 사용하고, 각 문자를 숫자로 변환하기 위해 map(Number)를 사용

    let strikes = 0;    // strikes, balls 값 초기화
    let balls = 0;

    for (let i = 0; i < 3; i++) {  // 배열은 0, 1, 2까지만 돌면 되니까, guess랑 targetArray를 비교해서 스트라이크와 볼을 계산
        if (guess[i] == targetArray[i]) {   // 사용자입력값의 [i]번째 요소 와 targetArray[i]번째 요소가 같으면 strike
            strikes++;
        } else if (targetArray.includes(parseInt(guess[i]))) { // targetArray에 입력값이 포함되어 있는지 확인 (.includes()사용)
            balls++;                            // parseInt()함수는 문자열로 되어있는 숫자를 파싱해줌 (숫자가 아닌 문자열이 오면 파싱 중지)
        }
    }

    if (strikes === 3) {
        return '3S';     // 3개 다 맞았을때 
    }

    return `${strikes}S ${balls}B`;   // 그렇지 않을때
}


// 게임 시작
startGame();
