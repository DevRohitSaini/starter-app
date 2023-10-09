import React, { useContext } from 'react';
import { Platform } from 'react-native';
import constant from '../CommanFiles/Constant/constant';
import { UserContextData } from '../contexts/UserContext';


const loginApi = async (url, data, isFormData) => {
    console.log('URL: ', url);
    console.log('Data: ', data);
   
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };   

    return fetch(url, requestOptions)
        .then(response => response.text())
        .then(result => {
            let data = JSON.parse(result);
            return data;
        })
        .catch(error => {
            console.log('error=>', error);
            return error;
        }); 
 
};

const signupApi = async (url, data, isFormData) => {
    console.log('URL: ', url);
    console.log('Data: ', data);
   
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };   

    return fetch(url, requestOptions)
        .then(response => response.text())
        .then(result => {
            let data = JSON.parse(result);
            return data;
        })
        .catch(error => {
            console.log('error=>', error);
            return error;
    });  
};

const passwordApi = async (url, data) => {   
    console.log('URL: ', url);
    console.log('data: ', data);

    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
    return fetch(url,requestOptions)
        .then(response => response.json())
        .then(json => {
        return json;
    })
    .catch(error => {
        console.error(error);
        return error;
    });
};

const getApi = async (url, token) => {   
    console.log('URL: ', url);
    console.log('token: ', token);
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    };    
    return fetch(url,requestOptions)
        .then(response => response.json())
        .then(json => {
        return json;
    })
    .catch(error => {
        console.error(error);
        return error;
    });
};

const putApi = async (url, token, data) => {   
    console.log('URL: ', url);
    console.log('token: ', token);
    console.log('data: ', data);

    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${token}` },
        body: JSON.stringify(data)
    };
    return fetch(url,requestOptions)
        .then(response => response.json())
        .then(json => {
        return json;
    })
    .catch(error => {
        console.error(error);
        return error;
    });
};

const postApi = async (url, token, data) => {
    console.log('URL: ', url);
    console.log('token: ', token);
    console.log('Data: ', data);
   
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${token}` },
        body: JSON.stringify(data)
    };   

    return fetch(url, requestOptions)
    .then(response => response.text())
    .then(result => {
        let data = JSON.parse(result);
        return data;
    })
    .catch(error => {
        console.log('error=>', error);
        return error;
    });
};

const deleteApi = async url => {
    const requestOptions = {
        method: 'DELETE',
        //headers: constant.headerJSON,
    };
    return (
        fetch(url, requestOptions)
            .then(async response => {
                // response.json();
                console.log('DELETE API RESPONSE: ', response);
                return response;
            })
            // .then(async response => response.json())
            // .then(data => {
            //   console.log('DELETE API RESPONSE: ', data);
            //   return data;
            // })
            .catch(error => {
                console.error('There was an error!', error);
                return error.message;
            })
    );
};

const uploadImg = async (url, token, data) => {
    console.log('URL: ', url);
    console.log('token: ', token);
    console.log('Data: ', data);

    return await fetch(
        url,
        {
          method: 'post',
          body: data,
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          },
        }
    )
    .then(result => {
        let data = JSON.parse(result);
        console.log('result=>', result);
        console.log('data=>', data);
        return data;
    })
    .catch(error => {
        console.log('error=>', error);
        return error;
    });
};

const patchApi = async (url, data, isFormData) => {
    console.log('URL: ', url);
    console.log('Data: ', data);
    let formBody = [];
    if (isFormData == false) {
        for (var property in data) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(data[property]);
            formBody.push(encodedKey + '=' + encodedValue);
        }
        formBody = formBody.join('&');
    }
    const requestOptions = {
        method: 'PATCH',
        headers:
            isFormData == true ? constant.headerFormData : constant.headerURLEncoded,
        body: isFormData == true ? data : formBody,
    };
    return fetch(url, requestOptions)
        .then(async response => response.json())
        .then(data => {
            console.log('PATCH API RESPONSE: ', data);
            return data;
        })
        .catch(error => {
            console.error('There was an error!', error);
            return error.message;
        });
};
const getApiWithData = async (url, data) => {
    console.log('URL: ', url);
    let formBody = [];
    for (var property in data) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(data[property]);
        formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    const requestOptions = {
        method: 'POST',
        headers: constant.headerURLEncoded,
        body: formBody
    };
    return fetch(url, requestOptions)
        .then(async response => {
            const data = await response.json();
            // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }
            return data;
        })
        .catch(error => {
            console.error('There was an error!', error);
            return error.message;
        });
};
const postApiWithoutData = async (url, tocken) => {
    // { storeData, setstoreData } = useContext(UserContextData);
    console.log('URL: ', url);
    var myHeaders = new Headers();
    // myHeaders.append("Authorization", "Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJKV1RTZXJ2aWNlQWNjZXNzVG9rZW4iLCJqdGkiOiIxYjIxMzNlOC1lZTEzLTQ0ZDktYThkOC0xOGI1YWUyYmEzNTciLCJpYXQiOiI5LzE5LzIwMjIgNjo0MzoxMCBBTSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6ImdvaGl5ZTQ5NTlAZXNtb3VkLmNvbSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkVtcGxveWVlIiwiZXhwIjoxNjYzNjEyOTkwLCJpc3MiOiJKV1RBdXRoZW50aWNhdGlvblNlcnZlciIsImF1ZCI6IkpXVFNlcnZpY2VQb3N0bWFuQ2xpZW50In0.r4LmII9zXBR2zC6-0e3sWV9EUNawercW2uiHLgnAYsgEqvbhQKotOYE9893NQJ3StthJAfsOLfP3rltsqkjOPQ");
    myHeaders.append("Authorization", "Bearer " + tocken);
    myHeaders.append("Cookie", "ARRAffinity=677ccf51ddbc35769908cc4f1d3bf6727dd496b2b396a5ba3254b729dd1c8513; ARRAffinitySameSite=677ccf51ddbc35769908cc4f1d3bf6727dd496b2b396a5ba3254b729dd1c8513");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
    };
    console.log('myHeaders', myHeaders)

    return fetch(url, requestOptions)
        .then(response => Promise.all([response, response.text()]))
        .then(([response, responseObj]) => {
            return JSON.parse(responseObj);
            //return [response, responseObj];
        })
        .catch(err => {
            console.log("error catch search:", err.message);

            // Choose one, depends what you need.
            // If you want to ignore the error and do something in a chained .then()
            return Promise.reject(err); // If you want to handle the error in a chained .catch()
        })



    // fetch("https://goindia.azurewebsites.net/api/Job/allJobs/1", requestOptions)
    //     .then(response => response.text())
    //     .then(result => {
    //         console.log(result)
    //         let data = JSON.parse(result);
    //         return data;
    //     })
    //     .catch(error => console.log('error', error));

    // return fetch(url, requestOptions)
    //     .then(response => Promise.all([response, response.text()]))
    //     .then(([response, responseObj]) => {
    //         return JSON.parse(responseObj);
    //         //return [response, responseObj];
    //     })
    //     .catch(err => {
    //         console.log("error catch search:", err.message);

    //         // Choose one, depends what you need.
    //         // If you want to ignore the error and do something in a chained .then()
    //         return Promise.reject(err); // If you want to handle the error in a chained .catch()
    //     })
};
const postApiWithData = async (url, tocken, data) => {
    console.log('URL: ', url);
    console.log('tocken: ', tocken);
    console.log('data: ', data);
    var myHeaders = new Headers();
    // myHeaders.append("Authorization", "Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJKV1RTZXJ2aWNlQWNjZXNzVG9rZW4iLCJqdGkiOiI0MWY3ZTE1NS03OWEyLTQ4ZTctYjU0OS1jMGJmNDU4YjNkZmQiLCJpYXQiOiI5LzE2LzIwMjIgNTozMDoxOSBBTSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6ImdvaGl5ZTQ5NTlAZXNtb3VkLmNvbSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkVtcGxveWVlIiwiZXhwIjoxNjYzMzQ5NDE5LCJpc3MiOiJKV1RBdXRoZW50aWNhdGlvblNlcnZlciIsImF1ZCI6IkpXVFNlcnZpY2VQb3N0bWFuQ2xpZW50In0.OUsp9y5b5AbNp5oR0VmGtVoPsaDQnBtROqHHILRw_rPCi6FdiQ7thW_idiRgpkn9q3mBNlTXUGmhnPRVVtRpzQ");
    myHeaders.append("Authorization", "Bearer " + tocken);
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", "ARRAffinity=677ccf51ddbc35769908cc4f1d3bf6727dd496b2b396a5ba3254b729dd1c8513; ARRAffinitySameSite=677ccf51ddbc35769908cc4f1d3bf6727dd496b2b396a5ba3254b729dd1c8513");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(data),
        redirect: 'follow'
    };
    console.log('myHeaders', myHeaders)

    return fetch(url, requestOptions)
        .then(response => Promise.all([response, response.text()]))
        .then(([response, responseObj]) => {
            //console.log('loooog', JSON.parse(responseObj))
            return JSON.parse(responseObj);
            //return [response, responseObj];
        })
        .catch(err => {
            console.log("error catch search:", err.message);
            return Promise.reject(err); // If you want to handle the error in a chained .catch()
        });
    // .then(response => response.text())
    // .then(result => {
    //     console.log(result);
    //     let data = JSON.parse(result);
    //     return data;
    // })
    // .catch(error => console.log('error', error));
};

export { loginApi, signupApi, passwordApi, getApi, putApi, postApi, deleteApi, uploadImg, patchApi, getApiWithData, postApiWithoutData, postApiWithData };
 