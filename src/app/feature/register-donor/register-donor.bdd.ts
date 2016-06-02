import chai = require("chai");
import mongoose = require("mongoose");
import {Donor} from "../../models/interface";
import {Database} from "../../config";
import {RegisterDonor} from "./register-donor";
import {RegisterDonorDTO} from "./register-donor.dto";
const expect = chai.expect;
describe("Register donor BDD", () => {
    let donor: any;
    let donorLocation: any;
    let database: Database = new Database;
    let registerDonorDto: RegisterDonorDTO, persistedRegisterDonorDTO: RegisterDonorDTO;
    let registerDonor: RegisterDonor;
    beforeEach((done) => {
        function clearDB() {
            for (let i in mongoose.connection.collections) {
                mongoose.connection.db.dropCollection(mongoose.connection.collections[i], () => {
                });
            }
            return done();
        }

        if (mongoose.connection.readyState === 0) {
            mongoose.connect(database.testUrl, function (err) {
                if (err) {
                    throw err;
                }
                return clearDB();
            });
        } else {
            return clearDB();
        }

        registerDonorDto = new RegisterDonorDTO();
        registerDonor = new RegisterDonor();
    });
    describe("GIVEN: I have donor registration detail", () => {
        beforeEach(() => {
            donor = {
                firstName: "Jerico",
                lastName: "de Guzman",
                bloodGroup: "O",
                emailAddress: "rickzx98@gmail.com",
                contactNumber: "0090 234 9344 434"
            };
            registerDonorDto.setDonor(donor);
        });
        describe("AND: I have donor location information", () => {
            beforeEach(() => {
                donorLocation = {
                    x: 1,
                    y: 2,
                    z: 3,
                    long: 123.21,
                    lat: 435.234
                };
                registerDonorDto.setDonorLocation(donorLocation);
            });
            describe("WHEN: submitting registration ", () => {
                beforeEach((done) => {
                    registerDonor.register(registerDonorDto, (err, data) => {
                        if (err) {
                            throw err;
                        }
                        persistedRegisterDonorDTO = data;
                        done();
                    });
                });
                it("THEN: donor\"s information and location will be saved", () => {
                    expect(persistedRegisterDonorDTO.getDonor().firstName).to.equal("Jerico");
                    expect(persistedRegisterDonorDTO.getDonor().lastName).to.equal("de Guzman");
                    expect(persistedRegisterDonorDTO.getDonor().contactNumber).to.equal("0090 234 9344 434");
                    expect(persistedRegisterDonorDTO.getDonor().emailAddress).to.equal("rickzx98@gmail.com");
                    expect(persistedRegisterDonorDTO.getDonor().bloodGroup).to.equal("O");
                });
            });
        });
    });
    afterEach((done) => {
        mongoose.disconnect();
        return done();
    });

});