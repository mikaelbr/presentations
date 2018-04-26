let add3 = (a: int, b: int, c: int) => a + b + c;
/* - : (int, int, int) => int = <fun> */

add3(3, 4, 5);
/* - : int = 12 */

let add3And4 = add3(3, 4);
/* - : int => int = <fun> */

add3And4(5);
/* - : int = 12 */




