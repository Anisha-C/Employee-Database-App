const Intern = require("../lib/Intern");

test("Can instantiate Intern instance", () => {
  const e = new Intern();
  expect(typeof (e)).toBe("object");
});

test("Can set name via constructor arguments", () => {
  const name = "Ani";
  const e = new Intern(name);
  expect(e.name).toBe(name);
});

test("Can set id via constructor argument", () => {
  const testValue = 100;
  const e = new Intern("H", testValue);
  expect(e.id).toBe(testValue);
});

test("Can set email via constructor argument", () => {
  const testValue = "test@test.com";
  const e = new Intern("H", 1, testValue);
  expect(e.email).toBe(testValue);
});

test("Can get name via getName()", () => {
  const testValue = "Ani";
  const e = new Intern(testValue);
  expect(e.getName()).toBe(testValue);
});

test("Can get id via getId()", () => {
  const testValue = 100;
  const e = new Intern("H", testValue);
  expect(e.getId()).toBe(testValue);
});

test("Can get email via getEmail()", () => {
  const testValue = "test@test.com";
  const e = new Intern("H", 1, testValue);
  expect(e.getEmail()).toBe(testValue);
});

test("getRole() should return \"Intern\"", () => {
  const testValue = "Intern";
  const e = new Intern("Ani", 1, "test@test.com");
  expect(e.getRole()).toBe(testValue);
});