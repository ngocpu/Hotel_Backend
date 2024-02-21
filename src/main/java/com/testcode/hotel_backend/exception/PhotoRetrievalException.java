package com.testcode.hotel_backend.exception;

public class PhotoRetrievalException extends RuntimeException{
    public PhotoRetrievalException(String mess){
        super(mess);
    }
}
