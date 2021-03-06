import React, { Component } from 'react'
import { Segment, List, Grid, Icon, Divider, Card, Image, Button, Container, Header, ListContent } from 'semantic-ui-react';
import MatchStore from './match-store';
import ChessBoard from './chess-board';


var MatchCard = class MatchCard extends Component {
  constructor(props) {
    super(props);
    this.state = props.match;
  }

  componentWillMount() {
    this.subscription = MatchStore.addListener(() => {
      this.setState(MatchStore.getMatch(this.state.id));
    });
  }
  componentWillUnmount() {
    if (!this.subscription) return;
    this.subscription.remove();
  }

  blackplayer() {
    if (!this.state.black) return '';
    const match = this.state;
    return (<Grid columns={2}>
      <Grid.Column floated='left' width={12}>
        <Image avatar src='/vendor/chessboardjs0.3.0/img/chesspieces/wikipedia/bK.png' />
        <span style={{ fontWeight: 'bold' }}>{match.black}</span>
      </Grid.Column>
      <Grid.Column floated='right' textAlign='right' width={4}>
        <span >Score: {match.valueBlackPieces}</span><span>  </span>
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
        <Grid.Column floated='right' textAlign='right' width={4}>
          <span >Score: {match.valueWhitePieces}</span> <span>  </span>
        </Grid.Column>
      </Grid>)
  }
  render() {

    return (
      <Container>
        {this.blackplayer()}
        <ChessBoard id={this.state.id} fen={this.state.board || ''} />
        {this.whiteplayer()}
      </Container>
    )
  }
}

export default MatchCard