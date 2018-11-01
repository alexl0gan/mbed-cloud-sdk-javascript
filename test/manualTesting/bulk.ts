import { DeviceEnrollmentBulkCreate } from "../../src/sdk/entities";
import { createReadStream } from "fs";

it("should upload csv for create", async () => {
    const bulk = new DeviceEnrollmentBulkCreate();
    const csv = createReadStream("/Users/alelog01/git/mbed-cloud-sdk-javascript/test/manualTesting/test.csv");
    await bulk.create(csv);
    expect(bulk.status).toBe("new");

    await bulk.get();
    expect(bulk.status === "completed" || bulk.status === "processing").toBeTruthy();
});

// it("should upload csv for delete", async () => {
//     const bulk = new EnrollmentBulkDeleteTask();
//     const csv = createReadStream("/Users/alelog01/git/mbed-cloud-sdk-javascript/test/manualTesting/test.csv");
//     await bulk.delete(csv);
//     expect(bulk.status).toBe("new");

//     await bulk.get();
//     expect(bulk.status === "completed" || bulk.status === "processing").toBeTruthy();
// });