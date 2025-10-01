# Unsluggish ChatGPT Input 
A lightweight Tampermonkey/Greasemonkey userscript that adds a floating
**input overlay** to ChatGPT.

This is useful if you have a long conversation and the input seems to get
sluggish.


## Features
- **Floating Overlay Textarea**
  - Press **`Ctrl + Alt + I`** to toggle the overlay on/off.
  - Supports multiline input (`Shift + Enter` for newline).

- **Overlay Send/Stop Button**
  - **Idle (green)** → Ready to send (`✉️`).
  - **Send (neutral)** → Sending in progress (`...`).
  - **Stop (red)** → Active response, can be interrupted (`⏹`).

- **Settings Menu** (⚙️ icon next to the overlay)
  - Toggle overlay button visibility.
  - Option: Pressing `Enter` can also stop ChatGPT responses.
  - Your preferences are stored in `localStorage` and restored automatically.

## Installation
1. Install [Tampermonkey](https://www.tampermonkey.net/) (or another userscript manager).
2. Add this script to Tampermonkey.
3. Open [ChatGPT](https://chat.openai.com/) or [chatgpt.com](https://chatgpt.com/).
4. Press **`Ctrl + Alt + I`** to toggle the overlay.


## Usage
1. Open ChatGPT and toggle the overlay (`Ctrl + Alt + I`).
2. Type your prompt in the overlay textarea.
   - `Enter` → Sends the text.
   - `Shift + Enter` → Adds a newline.
3. Or Use the **overlay button**:
   - `✉️` → Click to send your text to ChatGPT.
   - `...` → Sending in progress.
   - `⏹` → Click to stop current ChatGPT response.
4. Adjust settings via the ⚙️ icon.


## Notes
- The overlay textarea syncs its content into ChatGPT’s input field automatically.
- Works best with the default ChatGPT web interface.
- Settings are saved per browser and persist between sessions.
