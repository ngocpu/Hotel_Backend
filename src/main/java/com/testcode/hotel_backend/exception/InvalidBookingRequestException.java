package com.testcode.hotel_backend.exception;

public class InvalidBookingRequestException extends RuntimeException{
    public InvalidBookingRequestException(String mess){
         super(mess);
    }
}
