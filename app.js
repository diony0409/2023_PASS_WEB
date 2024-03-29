const express = require('express'); //import와 비슷,express를 불러온다
const app = express(); //const는 바뀔일이 없다

const passport          = require('passport');
const passportConfig    = require('./passport');
const session           = require('express-session');
const flash             = require('connect-flash');

passportConfig()

//세션 설정
app.use(
    session({
       resave: false,
       saveUninitialized: false,
       secret: "sessionsecretsessionsecret",
    }),
);

//passport 초기화
app.use(passport.initialize()); //req에 passport 설정 추가
app.use(passport.session());    //req.session에 passport 데이터 추가
app.use(flash());

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs'); //엔진을 ejs로 쓰자

//라우트 객체 생성
const mainRouter    = require('./routes/index');
const dustRouter    = require('./routes/dust');
const userRouter    = require('./routes/user');
const newsRouter    = require('./routes/news');
const wifiRouter    = require('./routes/wifi');
const maskRouter    = require('./routes/mask');
const tfjsRouter    = require('./routes/tfjs');
const sttRouter    = require('./routes/stt');




//라우트 설정
app.use('/', mainRouter);
app.use('/dust', dustRouter);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/user', userRouter);
app.use('/news', newsRouter);
app.use('/wifi', wifiRouter);
app.use('/mask', maskRouter);
app.use(express.static(__dirname + '/public'));
app.use('/tfjs', tfjsRouter);
app.use('/stt', sttRouter);

const PORT = 8080; //web 기본 포트는 80 localhost:8080
app.listen(PORT, function() { //서버멈출때까지 8080에서 들어오는 신호 감시
    console.log('Listening on port: ', PORT); //console.log는 프린트와 같
});