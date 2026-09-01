import { describe, expect, it } from "vitest";
import { askChatbot } from "../chatbotService";

describe("chatbot conversational replies", () => {
  it("responds naturally to greetings", async () => {
    expect((await askChatbot("uy")).answer).toContain("Halo");
  });

  it("responds naturally to thanks and acknowledgements", async () => {
    expect((await askChatbot("terimakasih")).answer).toContain("Sama-sama");
    expect((await askChatbot("ohh gitu")).answer).toContain("Silakan lanjutkan");
  });

  it("asks for clarification when the request is too vague", async () => {
    expect((await askChatbot("gimana ini caranya")).answer).toContain("Maksudnya");
  });
});
