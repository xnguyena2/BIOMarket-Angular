import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StreamService {

  constructor(private _zone: NgZone) { }

  public GetServerSentEvent(url: string) {
    return new Observable<any>((observer) => {
      console.log('Start Stream');
      let eventSource = new EventSource(url);

      eventSource.addEventListener('message', (event) => {
        console.log('addEventListener');
        console.log(event);
        this._zone.run(() => {
          observer.next(JSON.parse(event.data));
        });
      });

      // eventSource.onmessage = (event) => {
      //   console.log('onmessage');
      //   console.log(event);
      //   this._zone.run(() => {
      //     observer.next(JSON.parse(event.data));
      //   });
      // };

      eventSource.onerror = (error) => {
        // readyState === 0 (closed) means the remote source closed the connection,
        // so we can safely treat it as a normal situation. Another way
        // of detecting the end of the stream is to insert a special element
        // in the stream of events, which the client can identify as the last one.
        if (eventSource.readyState === 0) {
          console.log('The stream has been closed by the server.');
          eventSource.close();
          observer.complete();
        } else {
          observer.error('EventSource error: ' + error);
        }
      }
    });
  }
}
