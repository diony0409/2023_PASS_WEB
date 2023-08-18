const express     = require('express');
const router      = express.Router();

const axios       = require('axios');
const cheerio     = require('cheerio');

router.get('/', async function(req, res) {
    
		//파라미터 설정
    url = "http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty";
    serviceKey = "FyXgihik6hVqHDMIqv8NtalkR4Y45gLIFQBGj%2FaTKUVqip2CHkpR0iJy4p%2B6Zy%2Bma0nDQooGDRhBejw9%2F8dSyA%3D%3D";
    returnType = encodeURI("xml");
    numOfRows = encodeURI("100");
    pageNo = encodeURI("1");
    sidoName = encodeURI("대구");
    ver= encodeURI("1.0");

		//파라미터를 query로 변환
    queryParams = '?' + encodeURI('serviceKey') + '=' + serviceKey;
    queryParams += '&' + encodeURI('returnType') + '=' + returnType;
    queryParams += '&' + encodeURI('numOfRows') + '=' + numOfRows;
    queryParams += '&' + encodeURI('pageNo') + '=' + pageNo;
    queryParams += '&' + encodeURI('sidoName') + '=' + sidoName;
    queryParams += '&' + encodeURI('ver') + '=' + ver;
    
    console.log('queryParams: ', queryParams);

    try {
        var context = new Array();
				//axios로 HTTP GET 요청
        const result = await axios.get(url + queryParams);
                // 답변이 올때까지 아래를 수행하지않음 -> await, async와 짝꿍
				//응답 데이터 저장
        const xml = result.data;
				//cheerio 객체 생성
        const $ = cheerio.load(xml);
				//태그가 item인 모든 항목 추출
        const itemList = $('item'); //태그이름이 item인 애들만 긁어와서 저장하겠음
				//전체 item 항목에서 측정소, 미세먼지, 초미세먼지 값 추출
        itemList.each(function(index, item) { //반복문돌면서 가져오기
            let stationName = $(item).find('stationName').text(); 
            //stationname의 텍스트를 가져옴
            let pm10Value = $(item).find('pm10Value').text();
            let pm25Value = $(item).find('pm25Value').text();
						//추출된 데이터를 JSON 형식의 배열에 저장
            context.push({stationName: stationName, pm10Value: pm10Value, pm25Value: pm25Value})
        
        });
        res.render('dust', {context: context});
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;