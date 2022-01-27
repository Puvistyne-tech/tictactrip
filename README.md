# tictactrip

This is a small API REST project to justify a given text using token authentification.

  1. A token of 24 hours of validity is issued for an email address.
  2. A user can justify his content (text) with a limit of 80_000 words per day
  3. Token can be renewed everyday which gives the user to an acess of 24 hours and with text limit of 80_000
  
## Routes
It contains principally two routes `api/token` and `api/justify`
  * `api/token` - to get or renew a token by passing an email address in a `POST` request  
  * `api/justify` - to justify the text passed in a `POST` request with `content-type:text`. It has a word limit of 80 000.

## Public URL 
You can access the api in : `https://tictactrip-01.herokuapp.com/`
