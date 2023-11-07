export function noticeFetchFn(method, url, dto){

    
        let options = {
            method : method,
            headers : {
    
                "Content-Type":"application/json"
    
            }
    
        };
    
    
    
        if(dto){
    
            options.body = JSON.stringify(dto);
    
        }
    
    
    
        return fetch(url, options)
    
        .then(res => {
    
            if(!res.ok){
    
                throw new Error("입력 실패");
    
            }
    
    
    
            return res.json();
    
        })
    
        .catch(error => {
    
            alert(error.message);
    
        });
    
    
    
    }



//매개변수: method(http메서드), url(요청 보낼 url), dto(요청 바디에 포함될 서버에 보낼 데이터)
export function fetchFn(method, url, dto){


    //options객체 초기화.
    //지정된 http메서드 & "Content-Type"헤더가 "application/json"으로 설정
    let options = {
        method : method,
        headers : {
            "Content-Type" : "application/json"
        }
    }
    // BTOKEN을 가져와서
    const token = localStorage.getItem("BTOKEN");
    console.log(token);


// BTOKEN이 정상적으로 존재한다면,  헤더에 Authorization 키명으로 "Bearer "토큰으로 등록함
    if(token !== null){
        options.headers.Authorization = "Bearer "+ token;
        console.log(token);

    }


    // 서버로 보내야 할 데이터가 있으면 body에 실어 보내야 함.
    // dto매개변수(=서버로 보내야 할 데이터)가 주어지면 
    // options객체에 dto객체의 JSON표현을 요청 바디로 추가함.

    if(dto){
        
        options.body = JSON.stringify(dto);

    }
    console.log(dto+"전달하는 dto 내용")



    
    //fetch함수를 통해
    //주어진 url로 실제 http요청 보내면서 options를 사용
    return fetch(url, options)
    //fetch함수가 반환하는 프로미스 사용해 응답을 비동기적으로 처리함. 
    .then(res => { 
        
        if(res.status===403){//로그인 구현하며 추가
            window.location.href="/auth/login";
        }


        if(!res.ok){
            throw new Error("작업 실패");
        }

        const contentType = res.headers.get("Content-Type");
        if (contentType && contentType.includes("application/json")) {
          return res.json();
        } else {
          return null; // 또는 원하는 처리를 수행할 수 있는 값으로 수정
        }
      })
      .catch((error) => {
        alert(error.message);
      });
}



export function memberCreateFetchFn(dto){
    //fetchFn함수 호출. 매개변수
    return fetchFn("POST", "http://localhost:9229/auth/create", dto)
    
    //요청 후 프로미스(서버가 받은 응답) 통해 처리함.
    .then(data =>{
        //응답 성공 -> data(res.json()통해 json데이터 파싱한 것)를 콘솔에 출력

        //현재 창의 url을 변경하여 화면 이동
        window.location.href = '/'
    })

}

    //모든 애들 받을 수 있음. 입력한 글의 정보는 DTO 형식으로 넘겨줌
export function CreateFetchFn(servicename, dto){ //dto만 넘겨받음.
    return fetchFn("POST", `http://localhost:9229/${servicename}`, dto) //fetchFn의 결과 요구.
    .then(data=> { // res.json(=data)이 옴.
        
        if(servicename === "auth"){ //=== : 같으면
            servicename = "members"; //= :변경한다
        }

        let what = "data.result.id";
        if(servicename === "members"){
            what = data.username;
        } 
        // else if(servicename === "board"){
        //     what = data.result.id;
        
        
        window.location.href = `/${servicename}/detail/${what}`;
    })
}



export function boardInsertFetchFn(servicename, dto){ //dto만 넘겨받음.
    return fetchFn("POST", "http://localhost:9229/board", dto) //fetchFn의 결과 요구.
    .then(data=> { // res.json(=data)이 옴.
      
        window.location.href = `/${servicename}/detail/${data.result.id}`;
    })
}





               //매개변수: method(http메서드), url(요청 보낼 url), formData(form태그 데이터가 들어 있는 객체.JSON아님!)
               export function fetchFnForFile(method, url, formData){

                const token = localStorage.getItem("BTOKEN");

                //options객체 초기화.
                //지정된 http메서드 & "Content-Type"헤더가 "application/json"으로 설정
                let options = {
                    method : method,
                    headers : {
                        // formData 객체를 이용
                        processData: false, 
                        contentType: false
                    }
                } 
            
            // BTOKEN이 정상적으로 존재한다면,  헤더에 Authorization 키명으로 "Bearer "토큰으로 등록함
                if(token !== null && token.length > 0){
                    options.headers.Authorization = "Bearer "+ token;
                }
            
            
                // 서버로 보내야 할 데이터가 있으면 body에 실어 보내야 함.
                // dto매개변수(=서버로 보내야 할 데이터)가 주어지면 
                // options객체에 dto객체의 JSON표현을 요청 바디로 추가함.
                if(formData){
                    //json으로 보내면 에러남*****JSON.stringify(formData);xx
                    options.body = formData;
            
                }
              
            
                //fetch함수를 통해
                //주어진 url로 실제 http요청 보내면서 options를 사용
                return fetch(url, options)
                //fetch함수가 반환하는 프로미스 사용해 응답을 비동기적으로 처리함. 
                .then(res => { 
                    
                    if(res.status===403){//로그인 구현하며 추가
                        window.location.href="/auth/login";
                    }
            
            
                    if(!res.ok){
                        throw new Error("작업 실패");
                    }
            
                    //응답이 성공적이면 바디에서 json데이터 파싱하고 프로미스 통해 반환.
                    return res.json();
                })
                
                //catch블록에서는 요청 또는 응답처리 중에 발생한 에러 메시지를 알림으로 보여줌
                .catch(error => {
                    alert(error.message);
                })
            }
            






