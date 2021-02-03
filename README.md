# ♠ 카드 찾기 게임 프로젝트


## 목차

|   내용    |
| :-------: |
| 게임 설명 |
| 실행 화면 |
| 업그레이드 기능 |


## 게임 설명

1. 난이도를 설정합니다.

   * 쉬움 : 8 * 3의 크기의 카드로 게임을 진행합니다.
   
   * 어려움 : 10 * 3의 크기의 카드로 게임을 진행합니다.

2. 게임 시작 버튼을 누릅니다.

   * 정답과 오답 카드들이 무작위로 배치됩니다.
   
   * 이용자에게 정답화면을 일정 시간 보여줍니다.
   
   * 일정 시간이 지나고 제한된 시간내에 이용자는 정답을 모두 찾습니다.
   
   * 오답 수가 7 초과 시 GAME OVER하게 됩니다.
   
   * 시간 초과 시 마찬가지로 GAME OVER하게 됩니다.

3. 단계마다 제한 시간과 요소가 다릅니다.

   * 정답을 보여주는 시간 : 모든 단계 공통 5초
   
   * 1단계 : 15초 (총 20초)
   
   * 2단계 : 10초 (총 15초)
   
   * 3단계 : 10초 (총 15초) + 함정 생성

4. 모든 단계를 CLEAR하도록 게임을 진행합니다.

   * 중간에 GAME OVER 시 1단계 및 난이도 설정 순서로 다시 이동합니다.
   
   * 1,2단계 CLEAR 시 다음 단계로 진행합니다.
   
   * 모든 단계를 CLEAR 시 1단계 및 난이도 설정 순서로 다시 이동합니다.


## 실행 화면

#### 1. 게임 초기 화면

<div style="text-align: center"><table><tr>
<td style="text-align: center">
  <img src="https://user-images.githubusercontent.com/28584213/82145233-5e18a580-9884-11ea-89fe-d2b510fb2804.png" width="400"/>
</td>
  </tr>
  </table></div>

#### 2. 정답 화면

<div style="text-align: center"><table><tr>
<td style="text-align: center">
  <img src="https://user-images.githubusercontent.com/28584213/82145238-61139600-9884-11ea-905f-99172ef8cd75.png" width="400"/>
</td>
  <td style="text-align: center">
    <img src="https://user-images.githubusercontent.com/28584213/82145245-6375f000-9884-11ea-92bf-8b0732a71441.png" width="400"/>
</td>
  </tr>
  </table></div>



#### 3. 진행 화면

<div style="text-align: center"><table><tr>
<td style="text-align: center">
  <img src="https://user-images.githubusercontent.com/28584213/82145239-61ac2c80-9884-11ea-921c-0fac45258715.png" width="400"/>
</td>
  <td style="text-align: center">
    <img src="https://user-images.githubusercontent.com/28584213/82145246-640e8680-9884-11ea-9386-83e5e59e9dab.png" width="400"/>
</td>
  </tr>
  </table></div>



#### 4. 결과 화면 (실패)

<div style="text-align: center"><table><tr>
<td style="text-align: center">
  <img src="https://user-images.githubusercontent.com/28584213/82145237-61139600-9884-11ea-8929-909347572196.png" width="400"/>
</td>
  <td style="text-align: center">
    <img src="https://user-images.githubusercontent.com/28584213/82145244-62dd5980-9884-11ea-9535-735eb4581d19.png" width="400"/>
</td>
  </tr>
  </table></div>



#### 5. 결과 화면 (성공)

<div style="text-align: center"><table><tr>
<td style="text-align: center">
  <img src="https://user-images.githubusercontent.com/28584213/82145236-607aff80-9884-11ea-9261-8a9f7750e8f5.png" width="400"/>
</td>
  <td style="text-align: center">
    <img src="https://user-images.githubusercontent.com/28584213/82145243-6244c300-9884-11ea-8950-ae0da10ffa90.png" width="400"/>
</td>
  </tr>
  </table></div>



#### 6. 결과 화면 (ALL CLEAR)

<div style="text-align: center"><table><tr>
<td style="text-align: center">
  <img src="https://user-images.githubusercontent.com/28584213/82145235-5fe26900-9884-11ea-8f48-669a3d03f50d.png" width="400"/>
</td>
  <td style="text-align: center">
    <img src="https://user-images.githubusercontent.com/28584213/82145240-6244c300-9884-11ea-9d3e-bb7ec5c2bb33.png" width="400"/>
</td>
  </tr>
  </table></div>




## 업그레이드 기능

* 게임 실패, 성공 시 다시 시작 구현

* 난이도 부여 (쉬움 : 8 * 3, 어려움 : 10 * 3)

* 실패 시, 선택한 정답은 결과 화면 때 선택된 것으로 표시

* 제한 시간 5초 이하 또는 실패 수 5개 이상 시 개수와 시간 텍스트 강조 표시

* 함정 요소 추가 > 3단계에 추가

* 단계 추가 (1,2,3 단계)

  > 1단계 : 시간 20초
  >
  > 2단계 : 시간 5초 감소
  >
  > 3단계 : 시간 5초 감소 및 함정 부여

* 모든 단계 성공 시, ALL CLEAR 텍스트 표시와 함께 단계 초기화
