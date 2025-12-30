import { Component, ElementRef, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Snowflake {
  id: number;
  left: number;
  duration: number;
  delay: number;
  size: number;
  symbol: string;
}

interface Star {
  id: number;
  left: number;
  top: number;
  delay: number;
}

interface TreeLight {
  id: number;
  left: number;
  top: number;
  delay: number;
  color: string;
}

interface Joke {
  setup: string;
  punchline: string;
}

interface Cookie {
  id: number;
  left: number;
  top: number;
}

interface FloatingEmoji {
  id: number;
  left: number;
  duration: number;
  delay: number;
  symbol: string;
}

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit, OnDestroy {
  @ViewChild('audioPlayer') audioPlayer!: ElementRef<HTMLAudioElement>;

  // Title animation
  titleLetters = 'Merry Christmas!'.split('');

  // Snow
  snowflakes: Snowflake[] = [];
  snowSymbols = ['❄', '❅', '❆', '✻', '✼', '❉'];

  // Stars
  stars: Star[] = [];

  // Tree
  lightsOn = true;
  treeLights: TreeLight[] = [];
  lightColors = ['#ff0000', '#00ff00', '#ffdd00', '#ff00ff', '#00ffff', '#ff6600'];

  // Hamster
  hamsterVisible = false;
  private hamsterTimeout: any;

  // Santa
  santaFlying = false;
  showHoHoHo = false;
  private santaInterval: any;

  // Card
  cardFlipped = false;

  // Jokes
  jokes: Joke[] = [
    { setup: "What do you call an obnoxious reindeer?", punchline: "Rude-olph!" },
    { setup: "Why was the snowman looking through carrots?", punchline: "He was picking his nose!" },
    { setup: "What do elves learn in school?", punchline: "The elf-abet!" },
    { setup: "What's every parent's favorite Christmas carol?", punchline: "Silent Night!" },
    { setup: "Why did the Christmas tree go to the barber?", punchline: "It needed to be trimmed!" },
    { setup: "What do you get when you cross a snowman with a vampire?", punchline: "Frostbite!" },
    { setup: "Why does Santa go down chimneys?", punchline: "Because it soots him!" },
    { setup: "What do snowmen eat for breakfast?", punchline: "Frosted Flakes!" },
    { setup: "What's Santa's favorite candy?", punchline: "Jolly Ranchers!" },
    { setup: "Why is Christmas just like a day at the office?", punchline: "You do all the work and the fat guy in the suit gets all the credit!" },
  ];
  currentJoke: Joke = this.jokes[0];
  showPunchline = false;

  // Rudolph
  rudolphGlowing = false;
  rudolphMessages = [
    "Wow, so bright! I can lead Santa's sleigh now!",
    "Ho ho ho! Rudolph is ready for Christmas Eve!",
    "Even Comet and Cupid are jealous of this glow!",
    "Santa says I'm the brightest reindeer in the North Pole!",
    "Red nose power activated! Let's go!",
  ];
  rudolphMessage = '';

  // Countdown
  isChristmas = false;
  daysUntilChristmas = 0;
  hoursUntilChristmas = 0;
  minutesUntilChristmas = 0;
  secondsUntilChristmas = 0;
  private countdownInterval: any;

  // Cookie Game
  cookieScore = 0;
  fallingCookies: Cookie[] = [];
  gameActive = false;
  private gameInterval: any;
  private cookieId = 0;

  // Music
  musicPlaying = true;

  // Floating emojis
  floatingEmojis: FloatingEmoji[] = [];
  emojiSymbols = ['🎄', '🎅', '🎁', '⭐', '🦌', '🔔', '🎀', '🍪'];

  // Current year
  currentYear = new Date().getFullYear();

  ngOnInit() {
    this.generateSnowflakes();
    this.generateStars();
    this.generateTreeLights();
    this.generateFloatingEmojis();
    this.startSantaAnimation();
    this.startCountdown();
    this.currentJoke = this.getRandomJoke();
    this.autoPlayMusic();
  }

  autoPlayMusic() {
    // Auto-play music after a short delay to allow DOM to load
    setTimeout(() => {
      if (this.audioPlayer) {
        this.audioPlayer.nativeElement.play().catch(() => {
          // Browser blocked autoplay, user needs to click
          this.musicPlaying = false;
        });
      }
    }, 500);
  }

  ngOnDestroy() {
    if (this.santaInterval) clearInterval(this.santaInterval);
    if (this.countdownInterval) clearInterval(this.countdownInterval);
    if (this.gameInterval) clearInterval(this.gameInterval);
    if (this.hamsterTimeout) clearTimeout(this.hamsterTimeout);
  }

  generateSnowflakes() {
    for (let i = 0; i < 50; i++) {
      this.snowflakes.push({
        id: i,
        left: Math.random() * 100,
        duration: 5 + Math.random() * 10,
        delay: Math.random() * 10,
        size: 10 + Math.random() * 20,
        symbol: this.snowSymbols[Math.floor(Math.random() * this.snowSymbols.length)]
      });
    }
  }

  generateStars() {
    for (let i = 0; i < 30; i++) {
      this.stars.push({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 40,
        delay: Math.random() * 3
      });
    }
  }

  generateTreeLights() {
    for (let i = 0; i < 20; i++) {
      this.treeLights.push({
        id: i,
        left: 20 + Math.random() * 60,
        top: 10 + Math.random() * 70,
        delay: Math.random() * 2,
        color: this.lightColors[Math.floor(Math.random() * this.lightColors.length)]
      });
    }
  }

  generateFloatingEmojis() {
    for (let i = 0; i < 15; i++) {
      this.floatingEmojis.push({
        id: i,
        left: Math.random() * 100,
        duration: 10 + Math.random() * 10,
        delay: Math.random() * 15,
        symbol: this.emojiSymbols[Math.floor(Math.random() * this.emojiSymbols.length)]
      });
    }
  }

  startSantaAnimation() {
    this.triggerSanta();
    this.santaInterval = setInterval(() => {
      this.triggerSanta();
    }, 15000);
  }

  triggerSanta() {
    this.santaFlying = true;
    setTimeout(() => {
      this.showHoHoHo = true;
    }, 2000);
    setTimeout(() => {
      this.showHoHoHo = false;
    }, 4000);
    setTimeout(() => {
      this.santaFlying = false;
    }, 8000);
  }

  toggleLights() {
    this.lightsOn = !this.lightsOn;
  }

  onTreeClick() {
    this.toggleLights();
    this.showHamster();
  }

  showHamster() {
    // Clear any existing timeout
    if (this.hamsterTimeout) {
      clearTimeout(this.hamsterTimeout);
    }

    // Show the hamster
    this.hamsterVisible = true;

    // Hide after 3 seconds
    this.hamsterTimeout = setTimeout(() => {
      this.hamsterVisible = false;
    }, 3000);
  }

  flipCard() {
    this.cardFlipped = !this.cardFlipped;
  }

  getRandomJoke(): Joke {
    return this.jokes[Math.floor(Math.random() * this.jokes.length)];
  }

  tellJoke() {
    if (this.showPunchline) {
      this.showPunchline = false;
      setTimeout(() => {
        this.currentJoke = this.getRandomJoke();
      }, 300);
    } else {
      this.showPunchline = true;
    }
  }

  toggleRudolph() {
    this.rudolphGlowing = !this.rudolphGlowing;
    if (this.rudolphGlowing) {
      this.rudolphMessage = this.rudolphMessages[Math.floor(Math.random() * this.rudolphMessages.length)];
    }
  }

  startCountdown() {
    this.updateCountdown();
    this.countdownInterval = setInterval(() => {
      this.updateCountdown();
    }, 1000);
  }

  updateCountdown() {
    const now = new Date();
    const currentYear = now.getFullYear();
    let christmas = new Date(currentYear, 11, 25);

    if (now > christmas) {
      christmas = new Date(currentYear + 1, 11, 25);
    }

    const diff = christmas.getTime() - now.getTime();

    if (diff <= 0) {
      this.isChristmas = true;
      return;
    }

    this.isChristmas = false;
    this.daysUntilChristmas = Math.floor(diff / (1000 * 60 * 60 * 24));
    this.hoursUntilChristmas = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    this.minutesUntilChristmas = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    this.secondsUntilChristmas = Math.floor((diff % (1000 * 60)) / 1000);
  }

  startCookieGame() {
    if (this.gameActive) return;

    this.gameActive = true;
    this.cookieScore = 0;
    this.fallingCookies = [];

    this.gameInterval = setInterval(() => {
      if (this.fallingCookies.length < 10) {
        this.fallingCookies.push({
          id: this.cookieId++,
          left: Math.random() * 90,
          top: 0
        });
      }

      this.fallingCookies = this.fallingCookies.map(cookie => ({
        ...cookie,
        top: cookie.top + 2
      })).filter(cookie => cookie.top < 100);
    }, 100);

    setTimeout(() => {
      this.gameActive = false;
      if (this.gameInterval) clearInterval(this.gameInterval);
      this.fallingCookies = [];
    }, 20000);
  }

  catchCookie(cookie: Cookie) {
    this.cookieScore += 10;
    this.fallingCookies = this.fallingCookies.filter(c => c.id !== cookie.id);
  }

  toggleMusic() {
    if (this.audioPlayer) {
      if (this.musicPlaying) {
        this.audioPlayer.nativeElement.pause();
      } else {
        this.audioPlayer.nativeElement.play().catch(() => {
          console.log('Audio playback requires user interaction');
        });
      }
      this.musicPlaying = !this.musicPlaying;
    }
  }
}
