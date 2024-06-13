import { getCookie, hasCookie, setCookie } from "cookies-next"
import { get } from "http"


export const getCookiesCart  = () : { [id : string ] : number } => {
  if (hasCookie('cart')) {
    const cookieCart = JSON.parse(getCookie('cart') as string ?? '{}')
    return cookieCart;
  }
  return {}
}

export const addProductToCart = (id : string) => {
  const cookiesCart = getCookiesCart();
  if(cookiesCart[id]){
    cookiesCart[id] +=1
  }
  else {
    cookiesCart[id] = 1
  }
  setCookie('cart',JSON.stringify(cookiesCart));
} 

export const removeProductFromCart = (id : string) => {
  const cookiesCart = getCookiesCart();
  if(cookiesCart[id]){
    delete cookiesCart[id];
    setCookie('cart',JSON.stringify(cookiesCart));
  }
}

export const removeSingleItemFromCart = (id : string) => {
  const cookiesCart = getCookiesCart();
  if(cookiesCart[id] && cookiesCart[id] > 1 ){
    cookiesCart[id] = cookiesCart[id] - 1 ;    
  }else{
    delete cookiesCart[id];
  }
  setCookie('cart',JSON.stringify(cookiesCart));
}

