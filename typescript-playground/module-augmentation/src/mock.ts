interface Mock {
    // return the provided value
    returns(obj: any): void;
    // throw the provided exception object
    throws(obj: Error): void;
}
