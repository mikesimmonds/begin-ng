import { Component, OnInit } from '@angular/core';
import { TopicService } from '../topic.service';

@Component({
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  topicsData$ = this.topicService.getTopics();

  constructor(private topicService: TopicService) {}

  ngOnInit(): void {}
}
