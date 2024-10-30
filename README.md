# project1-2024
2024-2학기 캡스톤 프로젝트 수업
OpenAPI를 사용한 인공지능 시스템 실습
# open weather map

지정된 장소의 현재 날씨를 표시
https://api.openweathermap.org/data/2.5/weather?q=london&units=metric&appid=7d96bc5108f52b80e2d9075a369b9f35
[실습해보기](https://api.openweathermap.org/data/2.5/weather?q=london&units=metric&appid=7d96bc5108f52b80e2d9075a369b9f35)
```javascript
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
 OPEN AI 에서 제공하는 텍스트생성 및 이미지 생성 실습
[OPEN AI 실습해보기](https://platform.openai.com/docs/overview)<br>
- 사용자의 입력부분을 OpenAi API를 사용해 텍스트 형태의 출력값을 가져옴
```javascript
$.ajax({
        type: "POST",
        url: "https://api.openai.com/v1/chat/completions",
        headers: {
            "Authorization": "Bearer " + OPENAPI_KEY
        },
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8"
    }).done(function (response) {
        console.log(response)
        //alert(response.choices[0].message.content)
        txtOut.value = (response.choices[0].message.content)
    }).fail(function (error) {
        console.log(error)
        errormsg = error.status + " : " + error.responseJSON.error.code + " - " + error.responseJSON.error.message
        txtOut.value = errormsg
    }
```
- 사용자의 입력부분을 OpenAi API를 사용해 생성된 이미지를 2장 출력함
```javascript
    )
$.ajax({
        type: "POST",
        url: "https://api.openai.com/v1/images/generations",
        headers: {
            "Authorization": "Bearer " + OPENAPI_KEY
        },
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8"
    }).done(function (response) {
        console.log(response)
        //alert(response.choices[0].message.content)
        gimage.src = (response.data[0].url)
        gimage2.src = (response.data[1].url)

    }).fail(function (error) {
        console.log(error)
        errormsg = error.status + " : " + error.responseJSON.error.code + " - " + error.responseJSON.error.message
        txtOut.value = errormsg
    }
    )
```
# goolge cloud vision

google cloud vision 에서 제공하는 FaceDetection 실습

[OpenWeatherMap실습해보기]("https://cloud.google.com/vision?hl=ko")
- 파일 입력 이벤트를 처리하여 이미지를 웹 페이지에 표시하고, 이미지 데이터에서 Base64 문자열을 추출하는 역할을 하는 함수
```js
function processFile(event) {
    const content = event.target.result;
    imagestring = content.replace('data:image/jpeg;base64,', ''); 
    document.getElementById("gimage").src = content; 
}
```
- 파일을 업로드 하는 함수
```js
function uploadFiles(files) {
    const file = files[0];
    const reader = new FileReader();
reader.onloadend = processFile;
    reader.readAsDataURL(file); 
}
```
- FaceDetection정보를 가져오고 출력하는 부분
```javascript
$.ajax({
        type: "POST",
        url: CV_URL,
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        data: JSON.stringify(data), 
        contentType: "application/json; charset=utf-8"
    }).done(function(response) {
        let resultText = ''; 

         document.getElementById("resultArea").value = resultText;

    }).fail(function(error) {
        console.log("이미지를 분석중 오류가 발생했습니다..");
        document.getElementById("resultArea").value = "Error: 이미지를 분석할 수 없습니다.";
    });

```
##분석결과
<a href='https://ifh.cc/v-zwjcr5' target='_blank'><img src='https://ifh.cc/g/zwjcr5.jpg' border='0'></a>

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
https://github.com/minu2001/Project1-2024-2