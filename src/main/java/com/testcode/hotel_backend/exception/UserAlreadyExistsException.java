package com.testcode.hotel_backend.exception;

public class UserAlreadyExistsException  extends  RuntimeException{
    public UserAlreadyExistsException(String mes){
        super(mes);
    }
}
