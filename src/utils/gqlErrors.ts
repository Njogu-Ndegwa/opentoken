import { ApolloError } from '@apollo/client';
import { Notify } from 'notiflix';
// import { IMessageContext } from '@components/messages';
// @ts-ignore
import * as _ from "lodash"
interface IError {
  exception: {
    response: {
      message: string[];
    };
  };
}

export const handleGQLErrors = (
  errors: ApolloError
)=> {
  console.log(errors, "----17----")
  try {
    
    const statusCode =  _.get(errors, 'networkError.statusCode')
    const errorsMessage = errors.message
    
    if([504, 521].includes(parseInt(statusCode || '0')) ) {

       window.location.href = '/admin/error-page'
    }
    
    // logout users if the server is unresponsive
    if(_.get(errors, 'graphQLErrors', []).length === 0) {
       if (errorsMessage) {
        Notify.failure(errorsMessage)
        // return notify({ status: 'error', text: errorsMessage }); 
       }
       window.location.href = '/admin/error-page'
    }
    if (Array.isArray(errors.graphQLErrors)) {
      if(_.get(errors, 'graphQLErrors[0].extensions.code') === 'INTERNAL_SERVER_ERROR') {
        let text;
        if (errors.message) {
          text = errors.message
        }
        else {
          text = 'Internal server error. Please contact support if the error persist.'
        }
        Notify.failure(text)
          // return notify({ status: 'error', text: text }); 
      } 
    }
    

    if (errors.graphQLErrors.length > 0) {
      console.log(errors?.graphQLErrors[0], "----52----")
      const _err = // @ts-ignore
        errors?.graphQLErrors[0]?.extensions?.response?.message || [];
        console.log(_err, "-----55---")
      if (_err.length) {
        if (typeof _err === 'string') {
           if (_err === 'Invalid Credentials') {
      // notify({
      //   status: 'error',
      //   text: 'Email or Password do not match',
      // });
      Notify.failure('Email or Password do not match')
      return;
    }
          Notify.failure(_err)
          // notify({ status: 'error', text: _err });
        } else {
          Notify.failure(_err[0])
          // notify({ status: 'error', text: _err[0] });
        }

        return;
      }
    }
   

    if (errors.message === 'Unauthorized') {
      Notify.failure('You are unauthorized to access this page')
      // notify({
      //   status: 'error',
      //   text: 'You are unauthorized to access this page',
      // });
      return;
    }
    errors.graphQLErrors.map((error) => { // @ts-ignore
      const exception = error?.extensions as IError;
      const messages = exception?.exception?.response?.message || [];
      if (typeof messages === 'string') {
        Notify.failure(messages)
        // notify({ text: messages, status: 'error' });
        return null;
      }
      if (messages) {
        return messages.map((msg) => Notify.failure(msg));
      } else {
        return '';
      }
    });

    if (errors.message && errors.graphQLErrors?.length) {
      if (errors.message === 'Bad Request Exception') return;
      return Notify.failure(errors.message)
    }

    if (errors.graphQLErrors.length === 0)
      return Notify.failure('An error occured')
  } catch (error) {
    Notify.failure('Some error occurred!')
  }
};

export const isNetworkError = (error: unknown) => {
  return (
    error instanceof ApolloError &&
    error.message === 'Network request failed' &&
    error.graphQLErrors.length === 0 &&
    error.networkError &&
    Object.keys(error.networkError).length === 0
  );
};
