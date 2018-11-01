/*
* Mbed Cloud JavaScript SDK
* Copyright Arm Limited 2017
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

import { User, LoginHistory, PolicyGroup } from "../../../src/sdk/entities";

describe("userCrud", () => {

    test("user get", async () => {
        try {
            const user = await new User().list().first();

            expect(user instanceof User).toBeTruthy();

            const gotUser = new User();
            gotUser.id = user.id;
            await gotUser.get();

            expect(gotUser instanceof User).toBeTruthy();
            expect(gotUser.createdAt).toEqual(user.createdAt);

            const loginHistory = gotUser.loginHistory[0];
            expect(loginHistory instanceof LoginHistory).toBeTruthy();
        } catch (e) {
            throw e;
        }
    });

    test("user list", async () => {
        try {
            const user = await new User().list().first();
            expect(user instanceof User).toBeTruthy();
        } catch (e) {
            throw e;
        }
    });

    test("user list foreignKey", async () => {
        try {
            const groups = await new PolicyGroup().list().all();

            const user = await new User().list().first();

            const newGroup = groups.find(g => user.groupIds.indexOf(g.id) === -1);
            if (newGroup) {
                user.groupIds.push(newGroup.id);

                await user.update();

                const userGroupIds = (await user.groups().all()).map(g => g.id);

                expect(userGroupIds).toContain(newGroup.id);
            }
        } catch (e) {
            throw e;
        }
    });

    test("phone demo", async () => {
        try {
            const user = new User();
            user.username = "alexjs";
            user.email = "alex@alex.alex";
            user.phoneNumber = "01638742452";
            user.fullName = "Alex Logan";
            await user.create();

            user.phoneNumber = "118118";

            await user.update();
            expect(user.phoneNumber).toEqual("118118");

            await user.delete();
        } catch (e) {
            throw e;
        }
    });
});