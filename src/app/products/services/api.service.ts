import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  cartItemCount = new BehaviorSubject(0)//to hold cart item count

  searchTerm=new BehaviorSubject('');//to hold search value
  //using behaviorsubject to pass stream of data from one compontent another compontent

  constructor(private http :HttpClient) { 
    this.cartCount()
  }
  BASE_URL='https://ecart-angular.onrender.com'
  //api function to get all  datas from database
  getAllProduct(){
    return this.http.get(`${this,this.BASE_URL}/products/all-products`)
  }
  //api function to particular products from database
  viewProduct(id:any){
    return this.http.get(`${this.BASE_URL}/products/view-product/${id}`)
  }

  //api function to add products to the wishlist
  addToWishlist(id:any,title:any,price:any,image:any){

    const body={
      id,
      title,
      price,
      image
    }
   return this.http.post(`${this.BASE_URL}/wishlists/add-to-wishlist`,body)
  }


  //view wishlist products
  viewWishlist(){
    return this.http.get(`${this.BASE_URL}/wishlists/view-all-wishlists`)
  }
  //delete wishlist products
  deleteWishlistProduct(id:any){
    return this.http.delete(`${this.BASE_URL}/wishlists/delete-wishlist-product/${id}`)
  }


  //add to cart
  addToCart(product:any){//product is an object with properties
  //get the product details - id,title,price,image,quantity
  const body={
    id:product.id,
    title:product.title,
    price:product.price,
    image:product.image,
    quantity:product.quantity
  }
  return this.http.post(`${this.BASE_URL}/carts/add-to-cart`,body)
  }

  getCart(){
    return this.http.get(`${this.BASE_URL}/carts/view-all-cart`)
  }

  cartCount(){
    this.getCart().subscribe((result:any)=>{
      this.cartItemCount.next(result.length)
    })
  }

  //delete cart product 
  deleteProduct(id:any){
    return this.http.delete(`${this.BASE_URL}/carts/delete-products/${id}`)
  }


  //increment cart product
  incrementProduct(id:any){
    return this.http.get(`${this.BASE_URL}/carts/increment-product/${id}`)
  }

  //decrement cart product
  decrementProduct(id:any){
    return this.http.get(`${this.BASE_URL}/carts/decrement-product/${id}`)
  }
}
