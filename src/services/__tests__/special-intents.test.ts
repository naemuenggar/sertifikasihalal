import { describe, expect, it } from "vitest";
import { askChatbot } from "../chatbotService";

describe("chatbot special intents", () => {
  it("answers halal status for pork and dogs", async () => {
    expect((await askChatbot("daging babi halal ga")).answer).toContain("Tidak");
    expect((await askChatbot("anjing halal ga")).answer).toContain("Tidak");
  });

  it("answers cattle slaughter requests", async () => {
    expect((await askChatbot("bisa sembelih sapi?")).answer).toContain("Bisa");
    expect((await askChatbot("mau dong sembelihin sapi gua")).answer).toContain("Bisa");
  });

  it("clarifies an ambiguous duration question", async () => {
    expect((await askChatbot("tahan berapa lama")).answer).toContain("masa berlaku");
  });
});
