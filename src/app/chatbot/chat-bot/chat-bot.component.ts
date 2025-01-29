import { Component } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { ChatMessage } from '../interfaces/chat-message';
import { SpeechService } from '../services/speech.service';
import { TextToSpeechService } from '../services/text-to-speech.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { API } from '../../../config/api.config';

@Component({
  selector: 'app-chat-bot',
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-bot.component.html',
  styleUrl: './chat-bot.component.css'
})
export class ChatBotComponent {
  messages: any[] = [ 
    {content: "You are Postsphere, a friendly and creative chatbot designed to help users craft engaging blog posts for the Postsphere website. Your primary goal is to guide users in brainstorming ideas, structuring their posts, improving writing style, and ensuring their content resonates with their audience. Be supportive, concise, and encouraging while offering practical writing tips and suggestions. Keep your tone conversational and aligned with the creative nature of the platform.", role: 'system'},
  ];
  userInput = "";
  isChatVisible = false;

  constructor(
    private chatService: ChatService,
    private speechService: SpeechService,
    private ttsService: TextToSpeechService
  ) {}

  startVoice(): void {
    this.speechService.startListening((transcript: string) => {
      this.userInput = transcript;
      console.log("Recognized:", transcript);
    });
  }

  stopVoice(): void {
    this.speechService.stopListening();
  }

  toggleVoice() {
    if (this.speechService.isListening) {
      this.speechService.stopListening();
    } else {
      this.speechService.startListening((transcript: string) => {
        this.userInput = transcript;
        console.log("Recognized:", transcript);
      });
    }
  }

  toggleChat() {
    this.isChatVisible = !this.isChatVisible;
  }

  sendMessage() {
    if (this.userInput.trim() === "") return;
    this.messages.push({
      content: this.userInput,
      role: "user",
    });
  
    const request = { "messages": this.messages, "model": "liquid/lfm-7b" };
    console.log(request);
  
    this.chatService.getBotResponse(request).subscribe({
      next: (response) => {
        console.log('Response:', response);
        // Assuming response has the structure you provided
        const botMessage = response?.body?.choices?.[0]?.message?.content;
        console.log('Bot response:', botMessage);
        if (botMessage) {
          this.messages.push({
            content: botMessage,
            role: "assistant",
          });
        }
      },
      error: (err) => {
        console.error('Error occurred:', err);
        // Handle error accordingly (show message, etc.)
      }
    });
    
    this.userInput = "";
  }
  
  readText(textToRead:string): void {
    if (textToRead.trim()) {
      this.ttsService.speak(textToRead);
    } else {
      alert('Please enter some text to read.');
    }
  }

  stopReading(): void {
    this.ttsService.stop();
  }
}
