console.log('test')
import * as EmailValidator from 'email-validator';

$(`#enter`).on('submit', function(e){
    e.preventDefault();
    const value = $('#email').val().trim();
    const validate = validator.validate(value)
    console.log(validate)
})
