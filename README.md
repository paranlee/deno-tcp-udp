# deno-tcp-udp

Use deno as TCP/UDP server.

## TCP server

Run deno TCP server.

```bash
 $ deno run --allow-net tcp-server.ts
```

## TCP client

Run deno TCP client.

```bash
 $ deno run --allow-net tcp-client.ts
```

or do nc.

```bash
 $ nc localhost 8080
```

## UDP server

Run deno UDP server.

```bash
 $ deno run --allow-net --unstable udp-server.ts
```
## UDP client

Run deno UDP client.

```bash
 $ deno run --allow-net --unstable udp-server.ts
```

or do nc.

```bash
 $ nc -u localhost 8081
```

# Reference

(Official deno install)[https://github.com/denoland/deno_install]

(Official deno examples)[https://deno.land/std/examples]

(Docs tcp-server)[https://deno.land/manual/getting_started/first_steps#tcp-server]
