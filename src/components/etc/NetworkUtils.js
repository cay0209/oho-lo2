
               //매개변수: method(http메서드), url(요청 보낼 url), dto(요청 바디에 포함될 데이터)
export function fetchFn(method, url, dto){

    //options객체 초기화.
    //지정된 http메서드 & "Content-Type"헤더가 "application/json"으로 설정
    let options = {
        method : method,
        headers : {
            "Content-Type" : "application/json"
        }
    }

    // dto매개변수가 주어지면 
    // options객체에 dto객체의 JSON표현을 요청 바디로 추가함.
    if(dto){
        options.body = JSON.stringify(dto);

    }

    //fetch함수를 통해
    //주어진 url로 실제 http요청 보내면서 options를 사용
    return fetch(url, options)
    //fetch함수가 반환하는 프로미스 사용해 응답을 비동기적으로 처리함. 
    .then(res => { 
        if(!res.ok){//응답상태가 ok인지 확인하고, 아니면 에러 발생시킴.
            throw new Error("입력 실패");
        }

        //응답이 성공적이면 바디에서 json데이터 파싱하고 프로미스 통해 반환.
        return res.json();
    })
    
    //catch블록에서는 요청 또는 응답처리 중에 발생한 에러 메시지를 알림으로 보여줌
    .catch(error => {
        alert(error.message);
    })
}



export function memberCreateFetchFn(dto){
    //fetchFn함수 호출. 매개변수
    return fetchFn("POST", "http://localhost:9005/members/create", dto)
    
    //요청 후 프로미스(서버가 받은 응답) 통해 처리함.
    .then(data =>{
        //응답 성공 -> data(res.json()통해 json데이터 파싱한 것)를 콘솔에 출력
        console.log(data);

        //현재 창의 url을 변경하여 화면 이동
        window.location.href = '/'
    })
}