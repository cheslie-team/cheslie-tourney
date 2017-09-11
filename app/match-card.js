import React, { Component } from 'react'
import { Segment, List, Grid, Icon, Divider, Card, Image, Button, Container, Header, ListContent } from 'semantic-ui-react';
import { onMatchUpdate } from './tourney-events';
import PlayerListItem from './player-list-item';
import ChessBoard from './chess-board';


var MatchCard = class MatchCard extends Component {
  constructor(props) {
    super(props);
    this.state = { matchId: this.props.matchId };
    onMatchUpdate((err, move) => {
      if (move.gameId === this.props.matchId) { this.setState(move) }
    })
  }
  blackplayer() {
    if (!this.state.black) return '';
    const match = this.state;
    return (<Grid columns={2}>
      <Grid.Column floated='left' width={12}>
        <Image avatar src='/vendor/chessboardjs0.3.0/img/chesspieces/wikipedia/bK.png' />
        <span style={{ fontWeight: 'bold' }}>{match.black}</span>
      </Grid.Column>
      <Grid.Column floated='right' width={4}>
        <span >Score: {match.valueBlackPieces}</span>
      </Grid.Column>
    </Grid>)
  }
  whiteplayer() {
    if (!this.state.white) return '';
    const match = this.state;
    return (
      <Grid columns={2}>
        <Grid.Column floated='left' width={12}>
          <Image avatar src='/vendor/chessboardjs0.3.0/img/chesspieces/wikipedia/wK.png' />
          <span style={{ fontWeight: 'bold' }}>{match.white}</span>
        </Grid.Column>
        <Grid.Column floated='right' width={4}>
          <span >Score: {match.valueWhitePieces}</span>
        </Grid.Column>
      </Grid>)
  }
  render() {
    const match = this.state;
    return (
      <Container style={{ width: '400px' }}>
        {this.blackplayer()}
        <ChessBoard fen={match.board} />
        {this.whiteplayer()}
      </Container>
    )
  }
}

export default MatchCard