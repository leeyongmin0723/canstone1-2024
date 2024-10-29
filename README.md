# project1-2024
2024-2학기 캡스톤 프로젝트 수업
OpenAPI를 사용한 인공지능 시스템 실습
# open weather map

지정된 장소의 현재 날씨를 표시
https://api.openweathermap.org/data/2.5/weather?q=london&units=metric&appid=7d96bc5108f52b80e2d9075a369b9f35
[실습해보기](https://api.openweathermap.org/data/2.5/weather?q=london&units=metric&appid=7d96bc5108f52b80e2d9075a369b9f35)
```
       $.ajax({
          type: "GET",
          url: 'https://api.openweathermap.org/data/2.5/weather?q=london&units=metric&appid=7d96bc5108f52b80e2d9075a369b9f35',
       }).done(function(response) {

             console.log(response)
             //alert(response.weather[0].main)

             let wdata = response
             let exdata = response.weather[0];
         
             temp.innerText = wdata.main.temp + "°C";
             min.innerText = wdata.main.temp_min;
             max.innerText = wdata.main.temp_max;
             wind.innerText = wdata.wind.speed;
         
             weather.innerText = exdata.main + "," + exdata.description;
             icon.setAttribute('src', icon_url + exdata.icon + ".png");
       }).fail(function(error) {
          alert("!/js/user.js에서 에러발생: " + error.statusText);
       });
```
# openAI
 
# goolge cloud vision

개발순서
1. 소스수정
2. 소스 저장
3. 스테이지
4. 커밋애 푸쉬
5. 커밋 메세지

git 설정
git config --global user.name "leeyongmin"
git config --global user.email "trex0723@naver.com"

2024-09-19 깃허브 