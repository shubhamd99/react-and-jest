### React And Jest

##### What is a Test?
* Code you write to verify the behavior of your application.
* Tests are a specifications for hwo our code should work.
* Verify that engineers are following best practices and conventions for your team.
* We write tests because it allows us to ship quality code faster.

##### Types of Tests?
* End-to-End: Spin up your app and simulate user behaviour. Kind of like a robot performing a task in your app.
* Integration: Verify that multiple units work together.
* Unit: Verify the functionality of a single function/component.
* Static: Catch typos and errors while riting code.

##### A Jest Test
```
const expected = true;
const actual = false;

test("it works", () => {
    expect(actual).toBe(expected);
});
```

