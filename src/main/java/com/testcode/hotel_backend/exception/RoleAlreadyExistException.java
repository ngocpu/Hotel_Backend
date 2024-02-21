package com.testcode.hotel_backend.exception;

public class RoleAlreadyExistException extends RuntimeException {
    public RoleAlreadyExistException(String mess){
        super(mess);
    }
}
