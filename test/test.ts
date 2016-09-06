import {
  ceilToCurrency,
  ceilToPrecision,
  floorToCurrency,
  floorToPrecision,
  roundToCurrency,
  roundToPrecision,
  toBinarySI,
  toSI
} from "../src";

import "should";

describe("display-si", () => {
  it("roundToPrecision", () => {
    roundToPrecision(0, 3).should.eql(0);
    roundToPrecision(123, 1).should.eql(100);
    roundToPrecision(123, 2).should.eql(120);
    roundToPrecision(123, 3).should.eql(123);
    roundToPrecision(156, 1).should.eql(200);
    roundToPrecision(156, 2).should.eql(160);
    roundToPrecision(156, 3).should.eql(156);
  });

  it("ceilToPrecision", () => {
    ceilToPrecision(0, 3).should.eql(0);
    ceilToPrecision(123, 1).should.eql(200);
    ceilToPrecision(123, 2).should.eql(130);
    ceilToPrecision(123, 3).should.eql(123);
    ceilToPrecision(156, 1).should.eql(200);
    ceilToPrecision(156, 2).should.eql(160);
    ceilToPrecision(156, 3).should.eql(156);
  });

  it("floorToPrecision", () => {
    floorToPrecision(0, 3).should.eql(0);
    floorToPrecision(123, 1).should.eql(100);
    floorToPrecision(123, 2).should.eql(120);
    floorToPrecision(123, 3).should.eql(123);
    floorToPrecision(156, 1).should.eql(100);
    floorToPrecision(156, 2).should.eql(150);
    floorToPrecision(156, 3).should.eql(156);
  });

  it("roundToCurrency", () => {
    roundToCurrency(0).should.eql(0);
    roundToCurrency(1).should.eql(1);
    roundToCurrency(1.4).should.eql(1);
    roundToCurrency(1.5).should.eql(2);
    roundToCurrency(1.6).should.eql(2);
    roundToCurrency(2).should.eql(2);
    roundToCurrency(2.5).should.eql(2);
    roundToCurrency(3).should.eql(2);
    roundToCurrency(4).should.eql(5);
    roundToCurrency(5).should.eql(5);
    roundToCurrency(7).should.eql(5);
    roundToCurrency(9).should.eql(10);
    roundToCurrency(11).should.eql(10);
    roundToCurrency(290).should.eql(200);
  });

  it("ceilToCurrency", () => {
    ceilToCurrency(0).should.eql(0);
    ceilToCurrency(1).should.eql(1);
    ceilToCurrency(1.4).should.eql(2);
    ceilToCurrency(1.5).should.eql(2);
    ceilToCurrency(1.6).should.eql(2);
    ceilToCurrency(2).should.eql(2);
    ceilToCurrency(2.5).should.eql(5);
    ceilToCurrency(3).should.eql(5);
    ceilToCurrency(4).should.eql(5);
    ceilToCurrency(5).should.eql(5);
    ceilToCurrency(7).should.eql(10);
    ceilToCurrency(9).should.eql(10);
    ceilToCurrency(11).should.eql(20);
    ceilToCurrency(290).should.eql(500);
  });

  it("floorToCurrency", () => {
    floorToCurrency(0).should.eql(0);
    floorToCurrency(1).should.eql(1);
    floorToCurrency(1.4).should.eql(1);
    floorToCurrency(1.5).should.eql(1);
    floorToCurrency(1.6).should.eql(1);
    floorToCurrency(2).should.eql(2);
    floorToCurrency(2.5).should.eql(2);
    floorToCurrency(3).should.eql(2);
    floorToCurrency(4).should.eql(2);
    floorToCurrency(5).should.eql(5);
    floorToCurrency(7).should.eql(5);
    floorToCurrency(9).should.eql(5);
    floorToCurrency(11).should.eql(10);
    floorToCurrency(290).should.eql(200);
  });

  it("toSI", () => {
    toSI(0).should.eql("0");
    toSI(1).should.eql("1");
    toSI(109).should.eql("109");
    toSI(999).should.eql("999");

    toSI(1000).should.eql("1K");
    toSI(1001).should.eql("1K");
    toSI(1024).should.eql("1K");
    toSI(1075).should.eql("1.1K");
    toSI(1076).should.eql("1.1K");
    toSI(1240).should.eql("1.2K");
    toSI(1540).should.eql("1.5K");
    toSI(9949).should.eql("9.9K");
    toSI(9999).should.eql("10K");

    toSI(12345).should.eql("12K");
    toSI(123456).should.eql("123K");
    toSI(1024000).should.eql("1M");
    toSI(1234567).should.eql("1.2M");
    toSI(74449000).should.eql("74M");

    toSI(Math.pow(2, 32)).should.eql("4.3G");
    toSI(Math.pow(2, 64)).should.eql("18E");
    toSI(Math.pow(10, 10)).should.eql("10G");
    toSI(Math.pow(10, 20)).should.eql("100E");

    toSI(0.1).should.eql("100m");
    toSI(0.01).should.eql("10m");
    toSI(0.001).should.eql("1m");
    toSI(0.0001).should.eql("100u");
    toSI(0.00001).should.eql("10u");
    toSI(0.000001).should.eql("1u");
    toSI(0.0000001).should.eql("100n");
  });

  it("toBinarySI", () => {
    toBinarySI(0).should.eql("0");
    toBinarySI(1).should.eql("1");
    toBinarySI(109).should.eql("109");
    toBinarySI(999).should.eql("999");

    toBinarySI(1000).should.eql("1000");
    toBinarySI(1001).should.eql("1001");
    toBinarySI(1024).should.eql("1K");
    toBinarySI(1075).should.eql("1K");
    toBinarySI(1076).should.eql("1.1K");
    toBinarySI(1240).should.eql("1.2K");
    toBinarySI(1540).should.eql("1.5K");
    toBinarySI(9949).should.eql("9.7K");
    toBinarySI(9999).should.eql("9.8K");

    toBinarySI(12345).should.eql("12K");
    toBinarySI(123456).should.eql("121K");
    toBinarySI(1024000).should.eql("1000K");
    toBinarySI(1234567).should.eql("1.2M");
    toBinarySI(74449000).should.eql("71M");

    toBinarySI(Math.pow(2, 32)).should.eql("4G");
    toBinarySI(Math.pow(2, 64)).should.eql("16E");
    toBinarySI(Math.pow(10, 10)).should.eql("9.3G");
    toBinarySI(Math.pow(10, 20)).should.eql("87E");

    toBinarySI(0.1).should.eql("102m");
    toBinarySI(0.01).should.eql("10m");
    toBinarySI(0.001).should.eql("1m");
    toBinarySI(0.0001).should.eql("105u");
    toBinarySI(0.00001).should.eql("10u");
    toBinarySI(0.000001).should.eql("1u");
    toBinarySI(0.0000001).should.eql("107n");
  });
});
