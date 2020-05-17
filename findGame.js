var time;
var numOfAnswer;
var numOfFailed;
var numOfTrap;
var timeSet;
var phase = 1;

//무작위로 정답을 생성해주는 함수 작성
function getRand(col) {
    var line = new Array(col);

    // 행에서 나올수 있는 정답의 최대 개수 제한
    if (col == 10) {
        var random = Math.floor(Math.random() * 5 + 2); // 한 행에서 최대 6개까지의 정답 생성
        var randomTrap = Math.floor(Math.random() * 2 + 1); // 한 행에서 최대 2개까지의 함정 생성
    } else if (col == 8) {
        var random = Math.floor(Math.random() * 3 + 2); // 한 행에서 최대 4개까지의 정답 생성
        var randomTrap = Math.floor(Math.random() + 1);  // 한 행에서 최대 1개까지의 함정 생성
    }

    // 각 행에 무작위로 정답 부여
    while (random > 0) {
        var r = Math.floor(Math.random() * col);
        line[r] = "<img src='front.png' alt='카드앞면' width='100px' height='150px'>";
        random--;
    }

    // 정답이 아닌 나머지 요소에 함정 카드 부여
    if (phase == 3) {
        while (randomTrap > 0) {
            var k = Math.floor(Math.random() * col);
            if (line[k] == "<img src='front.png' alt='카드앞면' width='100px' height='150px'>") {
                continue;
            }
            line[k] = "<img src='trap.png' alt='함정' width='100px' height='150px'>";
            randomTrap--;
        }
    }

    // 정답과 함정이 아닌 나머지 요소에 틀린 답 부여
    for (var i = 0; i < col; i++) {
        if (line[i] == "<img src='front.png' alt='카드앞면' width='100px' height='150px'>") {
            numOfAnswer++;
            continue;
        } else if (line[i] == "<img src='trap.png' alt='함정' width='100px' height='150px'>") {
            continue;
        }
        line[i] = "<img src='back.png' alt='카드뒷면' width='100px' height='150px'>";
    }
    return line;
}

// 게임 시작 버튼
function gameStart() {
    if (document.getElementById("button").innerHTML == "실행 중") {
        return 0;
    } else if (document.getElementById("status").innerHTML != "게임을 시작하시오" || document.getElementById('difficulty').innerHTML == "선택 안함") {
        alert("난이도를 선택하셔야 합니다.");
        return 0;
    } else {
        clearInterval(timeSet);
        if (phase == 1) {
            time = 21;
            standard = 21;
        } else if (phase >= 2) {
            time = 16;
            standard = 16;
        }
        document.getElementById("clock").innerHTML = time - 1;
        timeSet = setInterval(playGame, 1000);
    }
}

// 게임 시작 전 초기화 함수
function init() {
    document.getElementById("gameover").style.visibility = "hidden";
    document.getElementById("success").style.visibility = "hidden";
    document.getElementById("clearEasy").style.visibility = "hidden";
    document.getElementById("clearHard").style.visibility = "hidden";
    document.getElementById("allClear").style.visibility = "hidden";
    document.getElementById("element").innerHTML = "남은 개수 : 0";
    document.getElementById("failed").innerHTML = "0";
    document.getElementById("clock").innerHTML = "0";
    document.getElementById("phase").innerHTML = phase;
    document.getElementById("status").innerHTML = "게임을 시작하시오";
    document.getElementById("failed").style.cssText = "font-weight:normal; color:black;";
    document.getElementById("clock").style.cssText = "font-weight:normal; color:black;";
    numOfFailed = 0;
    numOfAnswer = 0;
    numOfTrap = 0;
    showBefore();
}

// 난이도 쉬움 버튼 클릭 시 8*3에 크기로 문제 설정
function easyMode() {
    if (document.getElementById("button").innerHTML == "실행 중") {
        return 0;
    } else {
        init();
        document.getElementById("gameover").style.left = "338px";
        document.getElementById("success").style.left = "380px";
        document.getElementById("allClear").style.left = "360px";
        document.getElementById("difficulty").innerHTML = "쉬움";
        line1 = getRand(8);
        line2 = getRand(8);
        line3 = getRand(8);
        var hidden = document.getElementsByClassName('hardmode');
        for (var i in hidden) {
            hidden[i].style.display = "none";
        }
    }
}

// 난이도 쉬움 버튼 클릭 시 10*3에 크기로 문제 설정
function hardMode() {
    if (document.getElementById("button").innerHTML == "실행 중") {
        return 0;
    } else {
        init();
        document.getElementById("gameover").style.left = "435px";
        document.getElementById("success").style.left = "478px";
        document.getElementById("allClear").style.left = "454px";
        document.getElementById("difficulty").innerHTML = "어려움";
        line1 = getRand(10);
        line2 = getRand(10);
        line3 = getRand(10);
        var hidden = document.getElementsByClassName('hardmode');
        for (var i in hidden) {
            hidden[i].style.display = "inline";
        }
    }
}

// 누른 요소가 정답인지 아닌지 확인 후 정답이면 정답 표시와 남은 수 감소, 정답이 아니면 실패 수 증가
function check(i, j) {
    if (document.getElementById('status').innerHTML == "시작") {
        if (i == 1) {
            if (line1[j] == "<img src='front.png' alt='카드앞면' width='100px' height='150px'>") {
                numOfAnswer--;
                document.getElementById("element").innerHTML = "남은 개수 : " + numOfAnswer;
                document.getElementById("img" + j).src = "front.png";
                line1[j] = "<img src='frontChecked.png' alt='카드앞면' width='100px' height='150px'>";  // 선택된 것으로 설정
            } else if (line1[j] == "<img src='back.png' alt='카드뒷면' width='100px' height='150px'>") {
                numOfFailed++;
                document.getElementById("failed").innerHTML = numOfFailed;
                line1[j] = "<img src='backChecked.png' alt='카드뒷면' width='100px' height='150px'>";   // 선택된 것으로 설정
            } else if (line1[j] == "<img src='trap.png' alt='함정' width='100px' height='150px'>") {
                numOfTrap++;
            }
        } else if (i == 2) {
            if (line2[j] == "<img src='front.png' alt='카드앞면' width='100px' height='150px'>") {
                numOfAnswer--;
                var k = j + 10;
                document.getElementById("element").innerHTML = "남은 개수 : " + numOfAnswer;
                document.getElementById("img" + k).src = "front.png";
                line2[j] = "<img src='frontChecked.png' alt='카드앞면' width='100px' height='150px'>";  // 선택된 것으로 설정
            } else if (line2[j] == "<img src='back.png' alt='카드뒷면' width='100px' height='150px'>") {
                numOfFailed++;
                document.getElementById("failed").innerHTML = numOfFailed;
                line2[j] = "<img src='backChecked.png' alt='카드뒷면' width='100px' height='150px'>";   // 선택된 것으로 설정
            } else if (line2[j] == "<img src='trap.png' alt='함정' width='100px' height='150px'>") {
                numOfTrap++;
            }
        } else if (i == 3) {
            if (line3[j] == "<img src='front.png' alt='카드앞면' width='100px' height='150px'>") {
                numOfAnswer--;
                var k = j + 20;
                document.getElementById("element").innerHTML = "남은 개수 : " + numOfAnswer;
                document.getElementById("img" + k).src = "front.png";
                line3[j] = "<img src='frontChecked.png' alt='카드앞면' width='100px' height='150px'>";  // 선택된 것으로 설정
            } else if (line3[j] == "<img src='back.png' alt='카드뒷면' width='100px' height='150px'>") {
                numOfFailed++;
                document.getElementById("failed").innerHTML = numOfFailed;
                line3[j] = "<img src='backChecked.png' alt='카드뒷면' width='100px' height='150px'>";   // 선택된 것으로 설정
            } else if (line3[j] == "<img src='trap.png' alt='함정' width='100px' height='150px'>") {
                numOfTrap++;
            }
        }
    }
}

function show() {
    document.write("<div>");
    for (var i = 0; i < 8; i++) {
        document.write("<span id = 'span" + i + "' onclick='check(1," + i + ")'>" + "<img src='back.png' alt='카드뒷면' width='100px' height='150px'>" + "</span>");
    }
    document.write("<span class = 'hardmode' id = 'span" + 8 + "' style ='display:none;' onclick='check(1," + 8 + ")'>" + "<img src='back.png' alt='카드뒷면' width='100px' height='150px'>" + "</span>");
    document.write("<span class = 'hardmode' id = 'span" + 9 + "' style ='display:none;' onclick='check(1," + 9 + ")'>" + "<img src='back.png' alt='카드뒷면' width='100px' height='150px'>" + "</span>");
    document.write("</div>");

    document.write("<div>");
    for (var i = 0; i < 8; i++) {
        var k = i + 10;
        document.write("<span id = 'span" + k + "' onclick='check(2," + i + ")'>" + "<img src='back.png' alt='카드뒷면' width='100px' height='150px'>" + "</span>");
    }
    document.write("<span class = 'hardmode' id = 'span" + 18 + "' style ='display:none;' onclick='check(2," + 8 + ")'>" + "<img src='back.png' alt='카드뒷면' width='100px' height='150px'>" + "</span>");
    document.write("<span class = 'hardmode' id = 'span" + 19 + "' style ='display:none;' onclick='check(2," + 9 + ")'>" + "<img src='back.png' alt='카드뒷면' width='100px' height='150px'>" + "</span>");
    document.write("</div>");

    document.write("<div>");
    for (var i = 0; i < 8; i++) {
        var k = i + 20;
        document.write("<span id = 'span" + k + "' onclick='check(3," + i + ")'>" + "<img src='back.png' alt='카드뒷면' width='100px' height='150px'>" + "</span>");
    }
    document.write("<span class = 'hardmode' id = 'span" + 28 + "' style ='display:none;' onclick='check(3," + 8 + ")'>" + "<img src='back.png' alt='카드뒷면' width='100px' height='150px'>" + "</span>");
    document.write("<span class = 'hardmode' id = 'span" + 29 + "' style ='display:none;' onclick='check(3," + 9 + ")'>" + "<img src='back.png' alt='카드뒷면' width='100px' height='150px'>" + "</span>");
    document.write("</div>");
}

function showBefore() {
    if (document.getElementById('difficulty').innerHTML == "쉬움") {
        for (var i = 0; i < 8; i++) {
            var l2 = i + 10;
            var l3 = i + 20;

            var idLine1 = 'span' + i;
            var idLine2 = 'span' + l2;
            var idLine3 = 'span' + l3;

            document.getElementById(idLine1).innerHTML = "<img src='back.png' alt='카드뒷면' id = 'img" + i + "' width='100px' height='150px'>";
            document.getElementById(idLine2).innerHTML = "<img src='back.png' alt='카드뒷면' id = 'img" + l2 + "' width='100px' height='150px'>";
            document.getElementById(idLine3).innerHTML = "<img src='back.png' alt='카드뒷면' id = 'img" + l3 + "' width='100px' height='150px'>";
        }
    } else if (document.getElementById('difficulty').innerHTML == "어려움") {
        for (var i = 0; i < 10; i++) {
            var l2 = i + 10;
            var l3 = i + 20;

            var idLine1 = 'span' + i;
            var idLine2 = 'span' + l2;
            var idLine3 = 'span' + l3;

            document.getElementById(idLine1).innerHTML = "<img src='back.png' alt='카드뒷면' id = 'img" + i + "' width='100px' height='150px'>";
            document.getElementById(idLine2).innerHTML = "<img src='back.png' alt='카드뒷면' id = 'img" + l2 + "' width='100px' height='150px'>";
            document.getElementById(idLine3).innerHTML = "<img src='back.png' alt='카드뒷면' id = 'img" + l3 + "' width='100px' height='150px'>";
        }
    }
}

function showAnswer() {
    if (document.getElementById('difficulty').innerHTML == "쉬움") {
        for (var i = 0; i < 8; i++) {
            var l2 = i + 10;
            var l3 = i + 20;

            var idLine1 = 'span' + i;
            var idLine2 = 'span' + l2;
            var idLine3 = 'span' + l3;

            document.getElementById(idLine1).innerHTML = line1[i];
            document.getElementById(idLine2).innerHTML = line2[i];
            document.getElementById(idLine3).innerHTML = line3[i];
        }
    } else if (document.getElementById('difficulty').innerHTML == "어려움") {
        for (var i = 0; i < 10; i++) {
            var l2 = i + 10;
            var l3 = i + 20;

            var idLine1 = 'span' + i;
            var idLine2 = 'span' + l2;
            var idLine3 = 'span' + l3;

            document.getElementById(idLine1).innerHTML = line1[i];
            document.getElementById(idLine2).innerHTML = line2[i];
            document.getElementById(idLine3).innerHTML = line3[i];
        }
    }
}

function playGame() {
    if (document.getElementById("difficulty").innerHTML == "쉬움") {
        document.getElementById("hard").style.display = "none";
    } else if (document.getElementById("difficulty").innerHTML == "어려움") {
        document.getElementById("easy").style.display = "none";
    }

    // 함정 선택 시 game over
    if (numOfTrap >= 1) {
        clearInterval(timeSet);
        document.getElementById("status").innerHTML = "실패!";
        document.getElementById("button").innerHTML = "다시 시작";
        document.getElementById("gameover").style.visibility = "visible";
        document.getElementById("failed").style.cssText = "font-weight:normal; color:black;";
        document.getElementById("clock").style.cssText = "font-weight:normal; color:black;";
        document.getElementById("easy").style.display = "inline-block";
        document.getElementById("hard").style.display = "inline-block";
        showAnswer();
        phase = 1;
    }

    // 실패 수 7 초과 시 game over
    if (numOfFailed > 7) {
        clearInterval(timeSet);
        document.getElementById("status").innerHTML = "실패!";
        document.getElementById("button").innerHTML = "다시 시작";
        document.getElementById("gameover").style.visibility = "visible";
        document.getElementById("failed").style.cssText = "font-weight:normal; color:black;";
        document.getElementById("clock").style.cssText = "font-weight:normal; color:black;";
        document.getElementById("easy").style.display = "inline-block";
        document.getElementById("hard").style.display = "inline-block";
        showAnswer();
        phase = 1;
    } else if (numOfFailed >= 5 && numOfFailed <= 7) {
        document.getElementById("failed").style.cssText = "font-weight:bold; color:red;";
    }

    // 정답 다 선택 시 success
    if (numOfAnswer == 0) {
        clearInterval(timeSet);
        document.getElementById("failed").style.cssText = "font-weight:normal; color:black;";
        document.getElementById("clock").style.cssText = "font-weight:normal; color:black;";
        showAnswer();
        if (phase < 3) {
            document.getElementById("success").style.visibility = "visible";
            document.getElementById("button").innerHTML = "다음 단계";
            document.getElementById("status").innerHTML = phase + "단계 성공!";
            phase++;
        } else if (phase == 3) {
            if (document.getElementById("difficulty").innerHTML == "쉬움") {
                document.getElementById("clearEasy").style.visibility = "visible";
            } else if (document.getElementById("difficulty").innerHTML == "어려움") {
                document.getElementById("clearHard").style.visibility = "visible";
            }
            document.getElementById("allClear").style.visibility = "visible";
            document.getElementById("status").innerHTML = "ALL CLEAR!";
            document.getElementById("button").innerHTML = "다시 시작";
            document.getElementById("easy").style.display = "inline-block";
            document.getElementById("hard").style.display = "inline-block";
            phase = 1;
        }
    }

    // 각 시간에 따른 게임 동작
    if (time == 1) {
        clearInterval(timeSet);
        document.getElementById("status").innerHTML = "시간 초과!";
        document.getElementById("button").innerHTML = "다시 시작";
        document.getElementById("clock").innerHTML = "0";
        document.getElementById("gameover").style.visibility = "visible";
        document.getElementById("failed").style.cssText = "font-weight:normal; color:black;";
        document.getElementById("clock").style.cssText = "font-weight:normal; color:black;";
        document.getElementById("easy").style.display = "inline-block";
        document.getElementById("hard").style.display = "inline-block";
        showAnswer();
        phase = 1;
    } else if (time == standard) {
        document.getElementById("element").innerHTML = "남은 개수 : " + numOfAnswer;
        document.getElementById("failed").innerHTML = numOfFailed;
        document.getElementById("status").innerHTML = "준비";
        document.getElementById("button").innerHTML = "실행 중";
        showAnswer();
        time--;
    } else if (time == standard - 5) {
        document.getElementById("status").innerHTML = "시작";
        showBefore();
        time--;
    } else if (time == 6) {
        document.getElementById("clock").style.cssText = "font-weight:bold; color:red;";
        time--;
    } else {
        time--;
    }

    document.getElementById("clock").innerHTML = time;
}