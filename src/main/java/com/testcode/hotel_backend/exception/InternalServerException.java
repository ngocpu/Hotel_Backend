package com.testcode.hotel_backend.exception;

public class InternalServerException extends  RuntimeException{
    public InternalServerException(String mess){
        super(mess);
    }
}
