<div align=center><h2>🧩 PUZZLING IDEA 🧩</h3></div>

<p align="center">
 <img src="https://user-images.githubusercontent.com/51811995/158551452-dc7e4b26-e4c7-4011-bcc4-47f2f247f312.png">
</p>

**건국대학교 IT 동아리 WIT**

|파트|이름|
|----|---|
|개발|[김태헌](https://github.com/Jake-huen), [박가은](https://github.com/gaeunpark924)|
|디자인|송언지, 최동우|
|기획|김유빈|

## 목차

1. [소개](#소개)
2. [기술 스택](#기술-스택)
3. [프로젝트 설명](#프로젝트-설명)
4. [설계](#설계)
   1. [navigation flow](#navigation-flow)
5. [브랜치 전략](#브랜치-전략)
6. [관리](#관리)

## 소개
다양한 **컨텐츠를 랜덤으로 매칭**해 아이디어를 만들고 자신의 아이디어를 **지속적으로 발전**시키는 모바일 아이데이션 애플리케이션입니다.
**퍼즐 컨셉**으로 유저들이 아이디어 퍼즐을 맞춰가면서 아이디어를 **생성**하고 **발전**시킬 수 있도록 도와줍니다.

#### 💡 아이데이션이란?
아이데이션이란 단순한 아이디어 자체가 아니라 새로운 아이디어를 만드는 **생성(Generating)**, **발전(Developing)**, 커뮤니케이션(Communicating) 과정을 아우르는 단어입니다.

<img src="https://user-images.githubusercontent.com/51811995/158553638-ee0b2c15-6771-4016-be56-91d9e4aa063f.png" width=600>

  🔗 [위키피디아 설명](https://en.wikipedia.org/wiki/Ideation_(creative_process))

## 기술 스택
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white">
<img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=Firebase&logoColor=white">
<img src="https://img.shields.io/badge/Google Play-414141?style=for-the-badge&logo=Google Play&logoColor=white">
<img src="https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=YouTube&logoColor=white">
<img src="https://img.shields.io/badge/Unsplash-000000?style=for-the-badge&logo=Unsplash&logoColor=white">

## 프로젝트 설명
### 1. 로그인 🧩
- 회원가입과 로그인을 통해 앱을 이용합니다.
- 비밀번호 찾기, 계정 삭제를 통해 개인 정보를 수정/삭제 합니다.
<img src="https://user-images.githubusercontent.com/51811995/160630800-e7ec41cb-2bc1-4016-b400-55a0c694eefe.gif" width=250/>

### 2. 랜덤 매칭 🧩
- 키워드에 맞는 이미지를 불러와 랜덤 매칭합니다.
- 양옆으로 스와이프 해서 퍼즐을 고르고 퍼즐 조합을 저장합니다.
<img src="https://user-images.githubusercontent.com/51811995/160636939-365f8bc2-96eb-4372-b9f3-3a6d2260da70.gif" width=250/>

### 3. 퍼즐 확장 🧩 
- 랜덤 매칭으로 생성한 아이디어를 퍼즐 맞추듯이 확장시킵니다.
- 이미지, 텍스트 퍼즐을 직접 생성하고 제목, 메모를 입력합니다.
<img src="https://user-images.githubusercontent.com/51811995/160632454-6eb61124-25cd-4adb-aff7-509d37e4f796.gif" width=250/>

### 4. 아이디어 리스트 🧩 
- 수정순, 생성순, 이름순으로 아이디어를 정렬하고 제목을 검색합니다.
- thumbnail으로 퍼즐 모양을 표시합니다.
<img src="https://user-images.githubusercontent.com/51811995/160635274-7b6a5a2a-bc44-45f7-b8c0-7b7bb9d63e70.gif" width=250/>

## 설계
### navigation flow
<img src="https://user-images.githubusercontent.com/51811995/158197545-51668b0f-d8d5-4199-a3ee-47ce015a7a57.PNG">

## 브랜치 전략
- main :  메인 브랜치
    - 배포시에는 필요에 따라 main브랜치에서 release 브랜치도 만들었습니다.
- develop : 개발이 끝나면 main에 merge 하였습니다.
- feature : 기능별로 feature 브랜치를 만들고 작업이 끝나면 develop에 merge 하였습니다.

<p>
<img src="https://user-images.githubusercontent.com/51811995/160810158-f60dfe05-fbaf-4a84-a9dc-46e6eeec2492.PNG" width=800>
</p>

## 관리
- Figma, Gather town, Discord 를 이용하여 기획, 디자이너 분들과 협업 하였습니다.
<p align="center">
  <img src="https://user-images.githubusercontent.com/51811995/158749817-f53ac104-c68d-4419-9a24-196ee4c2a3e8.png" width=70>
  <img src="https://user-images.githubusercontent.com/51811995/158753629-055b0586-ffb4-4321-9f2c-f79fa181a6c6.png" width=120>
  <img src="https://user-images.githubusercontent.com/51811995/158750336-ebe4f865-2525-4cc2-9054-bcf36da2bd8f.png" width=90>
</p>
<p align="center">
 <img src="https://user-images.githubusercontent.com/51811995/159105521-27df46ad-1926-47c0-99bf-d91710b97805.PNG" width=400>
 <img src="https://user-images.githubusercontent.com/51811995/160619464-d59003eb-23da-494b-ae31-98e6993c1def.png" width=400>
</p>
