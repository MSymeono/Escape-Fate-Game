
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Lobby
 * 
 */
export type Lobby = $Result.DefaultSelection<Prisma.$LobbyPayload>
/**
 * Model Player
 * 
 */
export type Player = $Result.DefaultSelection<Prisma.$PlayerPayload>
/**
 * Model GameState
 * 
 */
export type GameState = $Result.DefaultSelection<Prisma.$GameStatePayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Lobbies
 * const lobbies = await prisma.lobby.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Lobbies
   * const lobbies = await prisma.lobby.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.lobby`: Exposes CRUD operations for the **Lobby** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Lobbies
    * const lobbies = await prisma.lobby.findMany()
    * ```
    */
  get lobby(): Prisma.LobbyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.player`: Exposes CRUD operations for the **Player** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Players
    * const players = await prisma.player.findMany()
    * ```
    */
  get player(): Prisma.PlayerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.gameState`: Exposes CRUD operations for the **GameState** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GameStates
    * const gameStates = await prisma.gameState.findMany()
    * ```
    */
  get gameState(): Prisma.GameStateDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.12.0
   * Query Engine version: 8047c96bbd92db98a2abc7c9323ce77c02c89dbc
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Lobby: 'Lobby',
    Player: 'Player',
    GameState: 'GameState'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "lobby" | "player" | "gameState"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Lobby: {
        payload: Prisma.$LobbyPayload<ExtArgs>
        fields: Prisma.LobbyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.LobbyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LobbyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.LobbyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LobbyPayload>
          }
          findFirst: {
            args: Prisma.LobbyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LobbyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.LobbyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LobbyPayload>
          }
          findMany: {
            args: Prisma.LobbyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LobbyPayload>[]
          }
          create: {
            args: Prisma.LobbyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LobbyPayload>
          }
          createMany: {
            args: Prisma.LobbyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.LobbyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LobbyPayload>[]
          }
          delete: {
            args: Prisma.LobbyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LobbyPayload>
          }
          update: {
            args: Prisma.LobbyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LobbyPayload>
          }
          deleteMany: {
            args: Prisma.LobbyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.LobbyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.LobbyUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LobbyPayload>[]
          }
          upsert: {
            args: Prisma.LobbyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$LobbyPayload>
          }
          aggregate: {
            args: Prisma.LobbyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateLobby>
          }
          groupBy: {
            args: Prisma.LobbyGroupByArgs<ExtArgs>
            result: $Utils.Optional<LobbyGroupByOutputType>[]
          }
          count: {
            args: Prisma.LobbyCountArgs<ExtArgs>
            result: $Utils.Optional<LobbyCountAggregateOutputType> | number
          }
        }
      }
      Player: {
        payload: Prisma.$PlayerPayload<ExtArgs>
        fields: Prisma.PlayerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PlayerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PlayerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>
          }
          findFirst: {
            args: Prisma.PlayerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PlayerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>
          }
          findMany: {
            args: Prisma.PlayerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>[]
          }
          create: {
            args: Prisma.PlayerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>
          }
          createMany: {
            args: Prisma.PlayerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PlayerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>[]
          }
          delete: {
            args: Prisma.PlayerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>
          }
          update: {
            args: Prisma.PlayerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>
          }
          deleteMany: {
            args: Prisma.PlayerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PlayerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PlayerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>[]
          }
          upsert: {
            args: Prisma.PlayerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlayerPayload>
          }
          aggregate: {
            args: Prisma.PlayerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePlayer>
          }
          groupBy: {
            args: Prisma.PlayerGroupByArgs<ExtArgs>
            result: $Utils.Optional<PlayerGroupByOutputType>[]
          }
          count: {
            args: Prisma.PlayerCountArgs<ExtArgs>
            result: $Utils.Optional<PlayerCountAggregateOutputType> | number
          }
        }
      }
      GameState: {
        payload: Prisma.$GameStatePayload<ExtArgs>
        fields: Prisma.GameStateFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GameStateFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameStatePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GameStateFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameStatePayload>
          }
          findFirst: {
            args: Prisma.GameStateFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameStatePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GameStateFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameStatePayload>
          }
          findMany: {
            args: Prisma.GameStateFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameStatePayload>[]
          }
          create: {
            args: Prisma.GameStateCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameStatePayload>
          }
          createMany: {
            args: Prisma.GameStateCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GameStateCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameStatePayload>[]
          }
          delete: {
            args: Prisma.GameStateDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameStatePayload>
          }
          update: {
            args: Prisma.GameStateUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameStatePayload>
          }
          deleteMany: {
            args: Prisma.GameStateDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GameStateUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GameStateUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameStatePayload>[]
          }
          upsert: {
            args: Prisma.GameStateUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameStatePayload>
          }
          aggregate: {
            args: Prisma.GameStateAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGameState>
          }
          groupBy: {
            args: Prisma.GameStateGroupByArgs<ExtArgs>
            result: $Utils.Optional<GameStateGroupByOutputType>[]
          }
          count: {
            args: Prisma.GameStateCountArgs<ExtArgs>
            result: $Utils.Optional<GameStateCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    lobby?: LobbyOmit
    player?: PlayerOmit
    gameState?: GameStateOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type LobbyCountOutputType
   */

  export type LobbyCountOutputType = {
    players: number
  }

  export type LobbyCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    players?: boolean | LobbyCountOutputTypeCountPlayersArgs
  }

  // Custom InputTypes
  /**
   * LobbyCountOutputType without action
   */
  export type LobbyCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the LobbyCountOutputType
     */
    select?: LobbyCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * LobbyCountOutputType without action
   */
  export type LobbyCountOutputTypeCountPlayersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlayerWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Lobby
   */

  export type AggregateLobby = {
    _count: LobbyCountAggregateOutputType | null
    _min: LobbyMinAggregateOutputType | null
    _max: LobbyMaxAggregateOutputType | null
  }

  export type LobbyMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
  }

  export type LobbyMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
  }

  export type LobbyCountAggregateOutputType = {
    id: number
    createdAt: number
    _all: number
  }


  export type LobbyMinAggregateInputType = {
    id?: true
    createdAt?: true
  }

  export type LobbyMaxAggregateInputType = {
    id?: true
    createdAt?: true
  }

  export type LobbyCountAggregateInputType = {
    id?: true
    createdAt?: true
    _all?: true
  }

  export type LobbyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Lobby to aggregate.
     */
    where?: LobbyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Lobbies to fetch.
     */
    orderBy?: LobbyOrderByWithRelationInput | LobbyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: LobbyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Lobbies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Lobbies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Lobbies
    **/
    _count?: true | LobbyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LobbyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LobbyMaxAggregateInputType
  }

  export type GetLobbyAggregateType<T extends LobbyAggregateArgs> = {
        [P in keyof T & keyof AggregateLobby]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLobby[P]>
      : GetScalarType<T[P], AggregateLobby[P]>
  }




  export type LobbyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: LobbyWhereInput
    orderBy?: LobbyOrderByWithAggregationInput | LobbyOrderByWithAggregationInput[]
    by: LobbyScalarFieldEnum[] | LobbyScalarFieldEnum
    having?: LobbyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LobbyCountAggregateInputType | true
    _min?: LobbyMinAggregateInputType
    _max?: LobbyMaxAggregateInputType
  }

  export type LobbyGroupByOutputType = {
    id: string
    createdAt: Date
    _count: LobbyCountAggregateOutputType | null
    _min: LobbyMinAggregateOutputType | null
    _max: LobbyMaxAggregateOutputType | null
  }

  type GetLobbyGroupByPayload<T extends LobbyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<LobbyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LobbyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LobbyGroupByOutputType[P]>
            : GetScalarType<T[P], LobbyGroupByOutputType[P]>
        }
      >
    >


  export type LobbySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    players?: boolean | Lobby$playersArgs<ExtArgs>
    gameState?: boolean | Lobby$gameStateArgs<ExtArgs>
    _count?: boolean | LobbyCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["lobby"]>

  export type LobbySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["lobby"]>

  export type LobbySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["lobby"]>

  export type LobbySelectScalar = {
    id?: boolean
    createdAt?: boolean
  }

  export type LobbyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt", ExtArgs["result"]["lobby"]>
  export type LobbyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    players?: boolean | Lobby$playersArgs<ExtArgs>
    gameState?: boolean | Lobby$gameStateArgs<ExtArgs>
    _count?: boolean | LobbyCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type LobbyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type LobbyIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $LobbyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Lobby"
    objects: {
      players: Prisma.$PlayerPayload<ExtArgs>[]
      gameState: Prisma.$GameStatePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
    }, ExtArgs["result"]["lobby"]>
    composites: {}
  }

  type LobbyGetPayload<S extends boolean | null | undefined | LobbyDefaultArgs> = $Result.GetResult<Prisma.$LobbyPayload, S>

  type LobbyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<LobbyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: LobbyCountAggregateInputType | true
    }

  export interface LobbyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Lobby'], meta: { name: 'Lobby' } }
    /**
     * Find zero or one Lobby that matches the filter.
     * @param {LobbyFindUniqueArgs} args - Arguments to find a Lobby
     * @example
     * // Get one Lobby
     * const lobby = await prisma.lobby.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends LobbyFindUniqueArgs>(args: SelectSubset<T, LobbyFindUniqueArgs<ExtArgs>>): Prisma__LobbyClient<$Result.GetResult<Prisma.$LobbyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Lobby that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {LobbyFindUniqueOrThrowArgs} args - Arguments to find a Lobby
     * @example
     * // Get one Lobby
     * const lobby = await prisma.lobby.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends LobbyFindUniqueOrThrowArgs>(args: SelectSubset<T, LobbyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__LobbyClient<$Result.GetResult<Prisma.$LobbyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Lobby that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LobbyFindFirstArgs} args - Arguments to find a Lobby
     * @example
     * // Get one Lobby
     * const lobby = await prisma.lobby.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends LobbyFindFirstArgs>(args?: SelectSubset<T, LobbyFindFirstArgs<ExtArgs>>): Prisma__LobbyClient<$Result.GetResult<Prisma.$LobbyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Lobby that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LobbyFindFirstOrThrowArgs} args - Arguments to find a Lobby
     * @example
     * // Get one Lobby
     * const lobby = await prisma.lobby.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends LobbyFindFirstOrThrowArgs>(args?: SelectSubset<T, LobbyFindFirstOrThrowArgs<ExtArgs>>): Prisma__LobbyClient<$Result.GetResult<Prisma.$LobbyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Lobbies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LobbyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Lobbies
     * const lobbies = await prisma.lobby.findMany()
     * 
     * // Get first 10 Lobbies
     * const lobbies = await prisma.lobby.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const lobbyWithIdOnly = await prisma.lobby.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends LobbyFindManyArgs>(args?: SelectSubset<T, LobbyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LobbyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Lobby.
     * @param {LobbyCreateArgs} args - Arguments to create a Lobby.
     * @example
     * // Create one Lobby
     * const Lobby = await prisma.lobby.create({
     *   data: {
     *     // ... data to create a Lobby
     *   }
     * })
     * 
     */
    create<T extends LobbyCreateArgs>(args: SelectSubset<T, LobbyCreateArgs<ExtArgs>>): Prisma__LobbyClient<$Result.GetResult<Prisma.$LobbyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Lobbies.
     * @param {LobbyCreateManyArgs} args - Arguments to create many Lobbies.
     * @example
     * // Create many Lobbies
     * const lobby = await prisma.lobby.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends LobbyCreateManyArgs>(args?: SelectSubset<T, LobbyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Lobbies and returns the data saved in the database.
     * @param {LobbyCreateManyAndReturnArgs} args - Arguments to create many Lobbies.
     * @example
     * // Create many Lobbies
     * const lobby = await prisma.lobby.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Lobbies and only return the `id`
     * const lobbyWithIdOnly = await prisma.lobby.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends LobbyCreateManyAndReturnArgs>(args?: SelectSubset<T, LobbyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LobbyPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Lobby.
     * @param {LobbyDeleteArgs} args - Arguments to delete one Lobby.
     * @example
     * // Delete one Lobby
     * const Lobby = await prisma.lobby.delete({
     *   where: {
     *     // ... filter to delete one Lobby
     *   }
     * })
     * 
     */
    delete<T extends LobbyDeleteArgs>(args: SelectSubset<T, LobbyDeleteArgs<ExtArgs>>): Prisma__LobbyClient<$Result.GetResult<Prisma.$LobbyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Lobby.
     * @param {LobbyUpdateArgs} args - Arguments to update one Lobby.
     * @example
     * // Update one Lobby
     * const lobby = await prisma.lobby.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends LobbyUpdateArgs>(args: SelectSubset<T, LobbyUpdateArgs<ExtArgs>>): Prisma__LobbyClient<$Result.GetResult<Prisma.$LobbyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Lobbies.
     * @param {LobbyDeleteManyArgs} args - Arguments to filter Lobbies to delete.
     * @example
     * // Delete a few Lobbies
     * const { count } = await prisma.lobby.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends LobbyDeleteManyArgs>(args?: SelectSubset<T, LobbyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Lobbies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LobbyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Lobbies
     * const lobby = await prisma.lobby.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends LobbyUpdateManyArgs>(args: SelectSubset<T, LobbyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Lobbies and returns the data updated in the database.
     * @param {LobbyUpdateManyAndReturnArgs} args - Arguments to update many Lobbies.
     * @example
     * // Update many Lobbies
     * const lobby = await prisma.lobby.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Lobbies and only return the `id`
     * const lobbyWithIdOnly = await prisma.lobby.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends LobbyUpdateManyAndReturnArgs>(args: SelectSubset<T, LobbyUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$LobbyPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Lobby.
     * @param {LobbyUpsertArgs} args - Arguments to update or create a Lobby.
     * @example
     * // Update or create a Lobby
     * const lobby = await prisma.lobby.upsert({
     *   create: {
     *     // ... data to create a Lobby
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Lobby we want to update
     *   }
     * })
     */
    upsert<T extends LobbyUpsertArgs>(args: SelectSubset<T, LobbyUpsertArgs<ExtArgs>>): Prisma__LobbyClient<$Result.GetResult<Prisma.$LobbyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Lobbies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LobbyCountArgs} args - Arguments to filter Lobbies to count.
     * @example
     * // Count the number of Lobbies
     * const count = await prisma.lobby.count({
     *   where: {
     *     // ... the filter for the Lobbies we want to count
     *   }
     * })
    **/
    count<T extends LobbyCountArgs>(
      args?: Subset<T, LobbyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LobbyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Lobby.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LobbyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LobbyAggregateArgs>(args: Subset<T, LobbyAggregateArgs>): Prisma.PrismaPromise<GetLobbyAggregateType<T>>

    /**
     * Group by Lobby.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LobbyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LobbyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LobbyGroupByArgs['orderBy'] }
        : { orderBy?: LobbyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LobbyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLobbyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Lobby model
   */
  readonly fields: LobbyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Lobby.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__LobbyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    players<T extends Lobby$playersArgs<ExtArgs> = {}>(args?: Subset<T, Lobby$playersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    gameState<T extends Lobby$gameStateArgs<ExtArgs> = {}>(args?: Subset<T, Lobby$gameStateArgs<ExtArgs>>): Prisma__GameStateClient<$Result.GetResult<Prisma.$GameStatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Lobby model
   */
  interface LobbyFieldRefs {
    readonly id: FieldRef<"Lobby", 'String'>
    readonly createdAt: FieldRef<"Lobby", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Lobby findUnique
   */
  export type LobbyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lobby
     */
    select?: LobbySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lobby
     */
    omit?: LobbyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LobbyInclude<ExtArgs> | null
    /**
     * Filter, which Lobby to fetch.
     */
    where: LobbyWhereUniqueInput
  }

  /**
   * Lobby findUniqueOrThrow
   */
  export type LobbyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lobby
     */
    select?: LobbySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lobby
     */
    omit?: LobbyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LobbyInclude<ExtArgs> | null
    /**
     * Filter, which Lobby to fetch.
     */
    where: LobbyWhereUniqueInput
  }

  /**
   * Lobby findFirst
   */
  export type LobbyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lobby
     */
    select?: LobbySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lobby
     */
    omit?: LobbyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LobbyInclude<ExtArgs> | null
    /**
     * Filter, which Lobby to fetch.
     */
    where?: LobbyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Lobbies to fetch.
     */
    orderBy?: LobbyOrderByWithRelationInput | LobbyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Lobbies.
     */
    cursor?: LobbyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Lobbies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Lobbies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Lobbies.
     */
    distinct?: LobbyScalarFieldEnum | LobbyScalarFieldEnum[]
  }

  /**
   * Lobby findFirstOrThrow
   */
  export type LobbyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lobby
     */
    select?: LobbySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lobby
     */
    omit?: LobbyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LobbyInclude<ExtArgs> | null
    /**
     * Filter, which Lobby to fetch.
     */
    where?: LobbyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Lobbies to fetch.
     */
    orderBy?: LobbyOrderByWithRelationInput | LobbyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Lobbies.
     */
    cursor?: LobbyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Lobbies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Lobbies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Lobbies.
     */
    distinct?: LobbyScalarFieldEnum | LobbyScalarFieldEnum[]
  }

  /**
   * Lobby findMany
   */
  export type LobbyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lobby
     */
    select?: LobbySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lobby
     */
    omit?: LobbyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LobbyInclude<ExtArgs> | null
    /**
     * Filter, which Lobbies to fetch.
     */
    where?: LobbyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Lobbies to fetch.
     */
    orderBy?: LobbyOrderByWithRelationInput | LobbyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Lobbies.
     */
    cursor?: LobbyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Lobbies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Lobbies.
     */
    skip?: number
    distinct?: LobbyScalarFieldEnum | LobbyScalarFieldEnum[]
  }

  /**
   * Lobby create
   */
  export type LobbyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lobby
     */
    select?: LobbySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lobby
     */
    omit?: LobbyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LobbyInclude<ExtArgs> | null
    /**
     * The data needed to create a Lobby.
     */
    data?: XOR<LobbyCreateInput, LobbyUncheckedCreateInput>
  }

  /**
   * Lobby createMany
   */
  export type LobbyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Lobbies.
     */
    data: LobbyCreateManyInput | LobbyCreateManyInput[]
  }

  /**
   * Lobby createManyAndReturn
   */
  export type LobbyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lobby
     */
    select?: LobbySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Lobby
     */
    omit?: LobbyOmit<ExtArgs> | null
    /**
     * The data used to create many Lobbies.
     */
    data: LobbyCreateManyInput | LobbyCreateManyInput[]
  }

  /**
   * Lobby update
   */
  export type LobbyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lobby
     */
    select?: LobbySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lobby
     */
    omit?: LobbyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LobbyInclude<ExtArgs> | null
    /**
     * The data needed to update a Lobby.
     */
    data: XOR<LobbyUpdateInput, LobbyUncheckedUpdateInput>
    /**
     * Choose, which Lobby to update.
     */
    where: LobbyWhereUniqueInput
  }

  /**
   * Lobby updateMany
   */
  export type LobbyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Lobbies.
     */
    data: XOR<LobbyUpdateManyMutationInput, LobbyUncheckedUpdateManyInput>
    /**
     * Filter which Lobbies to update
     */
    where?: LobbyWhereInput
    /**
     * Limit how many Lobbies to update.
     */
    limit?: number
  }

  /**
   * Lobby updateManyAndReturn
   */
  export type LobbyUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lobby
     */
    select?: LobbySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Lobby
     */
    omit?: LobbyOmit<ExtArgs> | null
    /**
     * The data used to update Lobbies.
     */
    data: XOR<LobbyUpdateManyMutationInput, LobbyUncheckedUpdateManyInput>
    /**
     * Filter which Lobbies to update
     */
    where?: LobbyWhereInput
    /**
     * Limit how many Lobbies to update.
     */
    limit?: number
  }

  /**
   * Lobby upsert
   */
  export type LobbyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lobby
     */
    select?: LobbySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lobby
     */
    omit?: LobbyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LobbyInclude<ExtArgs> | null
    /**
     * The filter to search for the Lobby to update in case it exists.
     */
    where: LobbyWhereUniqueInput
    /**
     * In case the Lobby found by the `where` argument doesn't exist, create a new Lobby with this data.
     */
    create: XOR<LobbyCreateInput, LobbyUncheckedCreateInput>
    /**
     * In case the Lobby was found with the provided `where` argument, update it with this data.
     */
    update: XOR<LobbyUpdateInput, LobbyUncheckedUpdateInput>
  }

  /**
   * Lobby delete
   */
  export type LobbyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lobby
     */
    select?: LobbySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lobby
     */
    omit?: LobbyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LobbyInclude<ExtArgs> | null
    /**
     * Filter which Lobby to delete.
     */
    where: LobbyWhereUniqueInput
  }

  /**
   * Lobby deleteMany
   */
  export type LobbyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Lobbies to delete
     */
    where?: LobbyWhereInput
    /**
     * Limit how many Lobbies to delete.
     */
    limit?: number
  }

  /**
   * Lobby.players
   */
  export type Lobby$playersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    where?: PlayerWhereInput
    orderBy?: PlayerOrderByWithRelationInput | PlayerOrderByWithRelationInput[]
    cursor?: PlayerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PlayerScalarFieldEnum | PlayerScalarFieldEnum[]
  }

  /**
   * Lobby.gameState
   */
  export type Lobby$gameStateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameState
     */
    select?: GameStateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameState
     */
    omit?: GameStateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameStateInclude<ExtArgs> | null
    where?: GameStateWhereInput
  }

  /**
   * Lobby without action
   */
  export type LobbyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Lobby
     */
    select?: LobbySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Lobby
     */
    omit?: LobbyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: LobbyInclude<ExtArgs> | null
  }


  /**
   * Model Player
   */

  export type AggregatePlayer = {
    _count: PlayerCountAggregateOutputType | null
    _min: PlayerMinAggregateOutputType | null
    _max: PlayerMaxAggregateOutputType | null
  }

  export type PlayerMinAggregateOutputType = {
    id: string | null
    name: string | null
    socketId: string | null
    lobbyId: string | null
  }

  export type PlayerMaxAggregateOutputType = {
    id: string | null
    name: string | null
    socketId: string | null
    lobbyId: string | null
  }

  export type PlayerCountAggregateOutputType = {
    id: number
    name: number
    socketId: number
    lobbyId: number
    _all: number
  }


  export type PlayerMinAggregateInputType = {
    id?: true
    name?: true
    socketId?: true
    lobbyId?: true
  }

  export type PlayerMaxAggregateInputType = {
    id?: true
    name?: true
    socketId?: true
    lobbyId?: true
  }

  export type PlayerCountAggregateInputType = {
    id?: true
    name?: true
    socketId?: true
    lobbyId?: true
    _all?: true
  }

  export type PlayerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Player to aggregate.
     */
    where?: PlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Players to fetch.
     */
    orderBy?: PlayerOrderByWithRelationInput | PlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Players from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Players.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Players
    **/
    _count?: true | PlayerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PlayerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PlayerMaxAggregateInputType
  }

  export type GetPlayerAggregateType<T extends PlayerAggregateArgs> = {
        [P in keyof T & keyof AggregatePlayer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePlayer[P]>
      : GetScalarType<T[P], AggregatePlayer[P]>
  }




  export type PlayerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlayerWhereInput
    orderBy?: PlayerOrderByWithAggregationInput | PlayerOrderByWithAggregationInput[]
    by: PlayerScalarFieldEnum[] | PlayerScalarFieldEnum
    having?: PlayerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PlayerCountAggregateInputType | true
    _min?: PlayerMinAggregateInputType
    _max?: PlayerMaxAggregateInputType
  }

  export type PlayerGroupByOutputType = {
    id: string
    name: string
    socketId: string
    lobbyId: string
    _count: PlayerCountAggregateOutputType | null
    _min: PlayerMinAggregateOutputType | null
    _max: PlayerMaxAggregateOutputType | null
  }

  type GetPlayerGroupByPayload<T extends PlayerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PlayerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PlayerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PlayerGroupByOutputType[P]>
            : GetScalarType<T[P], PlayerGroupByOutputType[P]>
        }
      >
    >


  export type PlayerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    socketId?: boolean
    lobbyId?: boolean
    lobby?: boolean | LobbyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["player"]>

  export type PlayerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    socketId?: boolean
    lobbyId?: boolean
    lobby?: boolean | LobbyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["player"]>

  export type PlayerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    socketId?: boolean
    lobbyId?: boolean
    lobby?: boolean | LobbyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["player"]>

  export type PlayerSelectScalar = {
    id?: boolean
    name?: boolean
    socketId?: boolean
    lobbyId?: boolean
  }

  export type PlayerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "socketId" | "lobbyId", ExtArgs["result"]["player"]>
  export type PlayerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lobby?: boolean | LobbyDefaultArgs<ExtArgs>
  }
  export type PlayerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lobby?: boolean | LobbyDefaultArgs<ExtArgs>
  }
  export type PlayerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lobby?: boolean | LobbyDefaultArgs<ExtArgs>
  }

  export type $PlayerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Player"
    objects: {
      lobby: Prisma.$LobbyPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      socketId: string
      lobbyId: string
    }, ExtArgs["result"]["player"]>
    composites: {}
  }

  type PlayerGetPayload<S extends boolean | null | undefined | PlayerDefaultArgs> = $Result.GetResult<Prisma.$PlayerPayload, S>

  type PlayerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PlayerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PlayerCountAggregateInputType | true
    }

  export interface PlayerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Player'], meta: { name: 'Player' } }
    /**
     * Find zero or one Player that matches the filter.
     * @param {PlayerFindUniqueArgs} args - Arguments to find a Player
     * @example
     * // Get one Player
     * const player = await prisma.player.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PlayerFindUniqueArgs>(args: SelectSubset<T, PlayerFindUniqueArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Player that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PlayerFindUniqueOrThrowArgs} args - Arguments to find a Player
     * @example
     * // Get one Player
     * const player = await prisma.player.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PlayerFindUniqueOrThrowArgs>(args: SelectSubset<T, PlayerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Player that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerFindFirstArgs} args - Arguments to find a Player
     * @example
     * // Get one Player
     * const player = await prisma.player.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PlayerFindFirstArgs>(args?: SelectSubset<T, PlayerFindFirstArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Player that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerFindFirstOrThrowArgs} args - Arguments to find a Player
     * @example
     * // Get one Player
     * const player = await prisma.player.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PlayerFindFirstOrThrowArgs>(args?: SelectSubset<T, PlayerFindFirstOrThrowArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Players that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Players
     * const players = await prisma.player.findMany()
     * 
     * // Get first 10 Players
     * const players = await prisma.player.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const playerWithIdOnly = await prisma.player.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PlayerFindManyArgs>(args?: SelectSubset<T, PlayerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Player.
     * @param {PlayerCreateArgs} args - Arguments to create a Player.
     * @example
     * // Create one Player
     * const Player = await prisma.player.create({
     *   data: {
     *     // ... data to create a Player
     *   }
     * })
     * 
     */
    create<T extends PlayerCreateArgs>(args: SelectSubset<T, PlayerCreateArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Players.
     * @param {PlayerCreateManyArgs} args - Arguments to create many Players.
     * @example
     * // Create many Players
     * const player = await prisma.player.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PlayerCreateManyArgs>(args?: SelectSubset<T, PlayerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Players and returns the data saved in the database.
     * @param {PlayerCreateManyAndReturnArgs} args - Arguments to create many Players.
     * @example
     * // Create many Players
     * const player = await prisma.player.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Players and only return the `id`
     * const playerWithIdOnly = await prisma.player.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PlayerCreateManyAndReturnArgs>(args?: SelectSubset<T, PlayerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Player.
     * @param {PlayerDeleteArgs} args - Arguments to delete one Player.
     * @example
     * // Delete one Player
     * const Player = await prisma.player.delete({
     *   where: {
     *     // ... filter to delete one Player
     *   }
     * })
     * 
     */
    delete<T extends PlayerDeleteArgs>(args: SelectSubset<T, PlayerDeleteArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Player.
     * @param {PlayerUpdateArgs} args - Arguments to update one Player.
     * @example
     * // Update one Player
     * const player = await prisma.player.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PlayerUpdateArgs>(args: SelectSubset<T, PlayerUpdateArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Players.
     * @param {PlayerDeleteManyArgs} args - Arguments to filter Players to delete.
     * @example
     * // Delete a few Players
     * const { count } = await prisma.player.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PlayerDeleteManyArgs>(args?: SelectSubset<T, PlayerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Players.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Players
     * const player = await prisma.player.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PlayerUpdateManyArgs>(args: SelectSubset<T, PlayerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Players and returns the data updated in the database.
     * @param {PlayerUpdateManyAndReturnArgs} args - Arguments to update many Players.
     * @example
     * // Update many Players
     * const player = await prisma.player.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Players and only return the `id`
     * const playerWithIdOnly = await prisma.player.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PlayerUpdateManyAndReturnArgs>(args: SelectSubset<T, PlayerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Player.
     * @param {PlayerUpsertArgs} args - Arguments to update or create a Player.
     * @example
     * // Update or create a Player
     * const player = await prisma.player.upsert({
     *   create: {
     *     // ... data to create a Player
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Player we want to update
     *   }
     * })
     */
    upsert<T extends PlayerUpsertArgs>(args: SelectSubset<T, PlayerUpsertArgs<ExtArgs>>): Prisma__PlayerClient<$Result.GetResult<Prisma.$PlayerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Players.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerCountArgs} args - Arguments to filter Players to count.
     * @example
     * // Count the number of Players
     * const count = await prisma.player.count({
     *   where: {
     *     // ... the filter for the Players we want to count
     *   }
     * })
    **/
    count<T extends PlayerCountArgs>(
      args?: Subset<T, PlayerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PlayerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Player.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PlayerAggregateArgs>(args: Subset<T, PlayerAggregateArgs>): Prisma.PrismaPromise<GetPlayerAggregateType<T>>

    /**
     * Group by Player.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlayerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PlayerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PlayerGroupByArgs['orderBy'] }
        : { orderBy?: PlayerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PlayerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPlayerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Player model
   */
  readonly fields: PlayerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Player.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PlayerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    lobby<T extends LobbyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LobbyDefaultArgs<ExtArgs>>): Prisma__LobbyClient<$Result.GetResult<Prisma.$LobbyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Player model
   */
  interface PlayerFieldRefs {
    readonly id: FieldRef<"Player", 'String'>
    readonly name: FieldRef<"Player", 'String'>
    readonly socketId: FieldRef<"Player", 'String'>
    readonly lobbyId: FieldRef<"Player", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Player findUnique
   */
  export type PlayerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * Filter, which Player to fetch.
     */
    where: PlayerWhereUniqueInput
  }

  /**
   * Player findUniqueOrThrow
   */
  export type PlayerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * Filter, which Player to fetch.
     */
    where: PlayerWhereUniqueInput
  }

  /**
   * Player findFirst
   */
  export type PlayerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * Filter, which Player to fetch.
     */
    where?: PlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Players to fetch.
     */
    orderBy?: PlayerOrderByWithRelationInput | PlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Players.
     */
    cursor?: PlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Players from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Players.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Players.
     */
    distinct?: PlayerScalarFieldEnum | PlayerScalarFieldEnum[]
  }

  /**
   * Player findFirstOrThrow
   */
  export type PlayerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * Filter, which Player to fetch.
     */
    where?: PlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Players to fetch.
     */
    orderBy?: PlayerOrderByWithRelationInput | PlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Players.
     */
    cursor?: PlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Players from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Players.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Players.
     */
    distinct?: PlayerScalarFieldEnum | PlayerScalarFieldEnum[]
  }

  /**
   * Player findMany
   */
  export type PlayerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * Filter, which Players to fetch.
     */
    where?: PlayerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Players to fetch.
     */
    orderBy?: PlayerOrderByWithRelationInput | PlayerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Players.
     */
    cursor?: PlayerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Players from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Players.
     */
    skip?: number
    distinct?: PlayerScalarFieldEnum | PlayerScalarFieldEnum[]
  }

  /**
   * Player create
   */
  export type PlayerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * The data needed to create a Player.
     */
    data: XOR<PlayerCreateInput, PlayerUncheckedCreateInput>
  }

  /**
   * Player createMany
   */
  export type PlayerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Players.
     */
    data: PlayerCreateManyInput | PlayerCreateManyInput[]
  }

  /**
   * Player createManyAndReturn
   */
  export type PlayerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * The data used to create many Players.
     */
    data: PlayerCreateManyInput | PlayerCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Player update
   */
  export type PlayerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * The data needed to update a Player.
     */
    data: XOR<PlayerUpdateInput, PlayerUncheckedUpdateInput>
    /**
     * Choose, which Player to update.
     */
    where: PlayerWhereUniqueInput
  }

  /**
   * Player updateMany
   */
  export type PlayerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Players.
     */
    data: XOR<PlayerUpdateManyMutationInput, PlayerUncheckedUpdateManyInput>
    /**
     * Filter which Players to update
     */
    where?: PlayerWhereInput
    /**
     * Limit how many Players to update.
     */
    limit?: number
  }

  /**
   * Player updateManyAndReturn
   */
  export type PlayerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * The data used to update Players.
     */
    data: XOR<PlayerUpdateManyMutationInput, PlayerUncheckedUpdateManyInput>
    /**
     * Filter which Players to update
     */
    where?: PlayerWhereInput
    /**
     * Limit how many Players to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Player upsert
   */
  export type PlayerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * The filter to search for the Player to update in case it exists.
     */
    where: PlayerWhereUniqueInput
    /**
     * In case the Player found by the `where` argument doesn't exist, create a new Player with this data.
     */
    create: XOR<PlayerCreateInput, PlayerUncheckedCreateInput>
    /**
     * In case the Player was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PlayerUpdateInput, PlayerUncheckedUpdateInput>
  }

  /**
   * Player delete
   */
  export type PlayerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
    /**
     * Filter which Player to delete.
     */
    where: PlayerWhereUniqueInput
  }

  /**
   * Player deleteMany
   */
  export type PlayerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Players to delete
     */
    where?: PlayerWhereInput
    /**
     * Limit how many Players to delete.
     */
    limit?: number
  }

  /**
   * Player without action
   */
  export type PlayerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Player
     */
    select?: PlayerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Player
     */
    omit?: PlayerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PlayerInclude<ExtArgs> | null
  }


  /**
   * Model GameState
   */

  export type AggregateGameState = {
    _count: GameStateCountAggregateOutputType | null
    _min: GameStateMinAggregateOutputType | null
    _max: GameStateMaxAggregateOutputType | null
  }

  export type GameStateMinAggregateOutputType = {
    id: string | null
    lobbyId: string | null
    updatedAt: Date | null
  }

  export type GameStateMaxAggregateOutputType = {
    id: string | null
    lobbyId: string | null
    updatedAt: Date | null
  }

  export type GameStateCountAggregateOutputType = {
    id: number
    state: number
    lobbyId: number
    updatedAt: number
    _all: number
  }


  export type GameStateMinAggregateInputType = {
    id?: true
    lobbyId?: true
    updatedAt?: true
  }

  export type GameStateMaxAggregateInputType = {
    id?: true
    lobbyId?: true
    updatedAt?: true
  }

  export type GameStateCountAggregateInputType = {
    id?: true
    state?: true
    lobbyId?: true
    updatedAt?: true
    _all?: true
  }

  export type GameStateAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GameState to aggregate.
     */
    where?: GameStateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameStates to fetch.
     */
    orderBy?: GameStateOrderByWithRelationInput | GameStateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GameStateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameStates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameStates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GameStates
    **/
    _count?: true | GameStateCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GameStateMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GameStateMaxAggregateInputType
  }

  export type GetGameStateAggregateType<T extends GameStateAggregateArgs> = {
        [P in keyof T & keyof AggregateGameState]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGameState[P]>
      : GetScalarType<T[P], AggregateGameState[P]>
  }




  export type GameStateGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GameStateWhereInput
    orderBy?: GameStateOrderByWithAggregationInput | GameStateOrderByWithAggregationInput[]
    by: GameStateScalarFieldEnum[] | GameStateScalarFieldEnum
    having?: GameStateScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GameStateCountAggregateInputType | true
    _min?: GameStateMinAggregateInputType
    _max?: GameStateMaxAggregateInputType
  }

  export type GameStateGroupByOutputType = {
    id: string
    state: JsonValue
    lobbyId: string
    updatedAt: Date
    _count: GameStateCountAggregateOutputType | null
    _min: GameStateMinAggregateOutputType | null
    _max: GameStateMaxAggregateOutputType | null
  }

  type GetGameStateGroupByPayload<T extends GameStateGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GameStateGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GameStateGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GameStateGroupByOutputType[P]>
            : GetScalarType<T[P], GameStateGroupByOutputType[P]>
        }
      >
    >


  export type GameStateSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    state?: boolean
    lobbyId?: boolean
    updatedAt?: boolean
    lobby?: boolean | LobbyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["gameState"]>

  export type GameStateSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    state?: boolean
    lobbyId?: boolean
    updatedAt?: boolean
    lobby?: boolean | LobbyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["gameState"]>

  export type GameStateSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    state?: boolean
    lobbyId?: boolean
    updatedAt?: boolean
    lobby?: boolean | LobbyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["gameState"]>

  export type GameStateSelectScalar = {
    id?: boolean
    state?: boolean
    lobbyId?: boolean
    updatedAt?: boolean
  }

  export type GameStateOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "state" | "lobbyId" | "updatedAt", ExtArgs["result"]["gameState"]>
  export type GameStateInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lobby?: boolean | LobbyDefaultArgs<ExtArgs>
  }
  export type GameStateIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lobby?: boolean | LobbyDefaultArgs<ExtArgs>
  }
  export type GameStateIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    lobby?: boolean | LobbyDefaultArgs<ExtArgs>
  }

  export type $GameStatePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GameState"
    objects: {
      lobby: Prisma.$LobbyPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      state: Prisma.JsonValue
      lobbyId: string
      updatedAt: Date
    }, ExtArgs["result"]["gameState"]>
    composites: {}
  }

  type GameStateGetPayload<S extends boolean | null | undefined | GameStateDefaultArgs> = $Result.GetResult<Prisma.$GameStatePayload, S>

  type GameStateCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GameStateFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GameStateCountAggregateInputType | true
    }

  export interface GameStateDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GameState'], meta: { name: 'GameState' } }
    /**
     * Find zero or one GameState that matches the filter.
     * @param {GameStateFindUniqueArgs} args - Arguments to find a GameState
     * @example
     * // Get one GameState
     * const gameState = await prisma.gameState.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GameStateFindUniqueArgs>(args: SelectSubset<T, GameStateFindUniqueArgs<ExtArgs>>): Prisma__GameStateClient<$Result.GetResult<Prisma.$GameStatePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one GameState that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GameStateFindUniqueOrThrowArgs} args - Arguments to find a GameState
     * @example
     * // Get one GameState
     * const gameState = await prisma.gameState.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GameStateFindUniqueOrThrowArgs>(args: SelectSubset<T, GameStateFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GameStateClient<$Result.GetResult<Prisma.$GameStatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GameState that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameStateFindFirstArgs} args - Arguments to find a GameState
     * @example
     * // Get one GameState
     * const gameState = await prisma.gameState.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GameStateFindFirstArgs>(args?: SelectSubset<T, GameStateFindFirstArgs<ExtArgs>>): Prisma__GameStateClient<$Result.GetResult<Prisma.$GameStatePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first GameState that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameStateFindFirstOrThrowArgs} args - Arguments to find a GameState
     * @example
     * // Get one GameState
     * const gameState = await prisma.gameState.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GameStateFindFirstOrThrowArgs>(args?: SelectSubset<T, GameStateFindFirstOrThrowArgs<ExtArgs>>): Prisma__GameStateClient<$Result.GetResult<Prisma.$GameStatePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more GameStates that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameStateFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GameStates
     * const gameStates = await prisma.gameState.findMany()
     * 
     * // Get first 10 GameStates
     * const gameStates = await prisma.gameState.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const gameStateWithIdOnly = await prisma.gameState.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GameStateFindManyArgs>(args?: SelectSubset<T, GameStateFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GameStatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a GameState.
     * @param {GameStateCreateArgs} args - Arguments to create a GameState.
     * @example
     * // Create one GameState
     * const GameState = await prisma.gameState.create({
     *   data: {
     *     // ... data to create a GameState
     *   }
     * })
     * 
     */
    create<T extends GameStateCreateArgs>(args: SelectSubset<T, GameStateCreateArgs<ExtArgs>>): Prisma__GameStateClient<$Result.GetResult<Prisma.$GameStatePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many GameStates.
     * @param {GameStateCreateManyArgs} args - Arguments to create many GameStates.
     * @example
     * // Create many GameStates
     * const gameState = await prisma.gameState.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GameStateCreateManyArgs>(args?: SelectSubset<T, GameStateCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GameStates and returns the data saved in the database.
     * @param {GameStateCreateManyAndReturnArgs} args - Arguments to create many GameStates.
     * @example
     * // Create many GameStates
     * const gameState = await prisma.gameState.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GameStates and only return the `id`
     * const gameStateWithIdOnly = await prisma.gameState.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GameStateCreateManyAndReturnArgs>(args?: SelectSubset<T, GameStateCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GameStatePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a GameState.
     * @param {GameStateDeleteArgs} args - Arguments to delete one GameState.
     * @example
     * // Delete one GameState
     * const GameState = await prisma.gameState.delete({
     *   where: {
     *     // ... filter to delete one GameState
     *   }
     * })
     * 
     */
    delete<T extends GameStateDeleteArgs>(args: SelectSubset<T, GameStateDeleteArgs<ExtArgs>>): Prisma__GameStateClient<$Result.GetResult<Prisma.$GameStatePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one GameState.
     * @param {GameStateUpdateArgs} args - Arguments to update one GameState.
     * @example
     * // Update one GameState
     * const gameState = await prisma.gameState.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GameStateUpdateArgs>(args: SelectSubset<T, GameStateUpdateArgs<ExtArgs>>): Prisma__GameStateClient<$Result.GetResult<Prisma.$GameStatePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more GameStates.
     * @param {GameStateDeleteManyArgs} args - Arguments to filter GameStates to delete.
     * @example
     * // Delete a few GameStates
     * const { count } = await prisma.gameState.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GameStateDeleteManyArgs>(args?: SelectSubset<T, GameStateDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GameStates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameStateUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GameStates
     * const gameState = await prisma.gameState.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GameStateUpdateManyArgs>(args: SelectSubset<T, GameStateUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GameStates and returns the data updated in the database.
     * @param {GameStateUpdateManyAndReturnArgs} args - Arguments to update many GameStates.
     * @example
     * // Update many GameStates
     * const gameState = await prisma.gameState.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more GameStates and only return the `id`
     * const gameStateWithIdOnly = await prisma.gameState.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends GameStateUpdateManyAndReturnArgs>(args: SelectSubset<T, GameStateUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GameStatePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one GameState.
     * @param {GameStateUpsertArgs} args - Arguments to update or create a GameState.
     * @example
     * // Update or create a GameState
     * const gameState = await prisma.gameState.upsert({
     *   create: {
     *     // ... data to create a GameState
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GameState we want to update
     *   }
     * })
     */
    upsert<T extends GameStateUpsertArgs>(args: SelectSubset<T, GameStateUpsertArgs<ExtArgs>>): Prisma__GameStateClient<$Result.GetResult<Prisma.$GameStatePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of GameStates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameStateCountArgs} args - Arguments to filter GameStates to count.
     * @example
     * // Count the number of GameStates
     * const count = await prisma.gameState.count({
     *   where: {
     *     // ... the filter for the GameStates we want to count
     *   }
     * })
    **/
    count<T extends GameStateCountArgs>(
      args?: Subset<T, GameStateCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GameStateCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GameState.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameStateAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GameStateAggregateArgs>(args: Subset<T, GameStateAggregateArgs>): Prisma.PrismaPromise<GetGameStateAggregateType<T>>

    /**
     * Group by GameState.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameStateGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GameStateGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GameStateGroupByArgs['orderBy'] }
        : { orderBy?: GameStateGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GameStateGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGameStateGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GameState model
   */
  readonly fields: GameStateFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GameState.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GameStateClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    lobby<T extends LobbyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, LobbyDefaultArgs<ExtArgs>>): Prisma__LobbyClient<$Result.GetResult<Prisma.$LobbyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the GameState model
   */
  interface GameStateFieldRefs {
    readonly id: FieldRef<"GameState", 'String'>
    readonly state: FieldRef<"GameState", 'Json'>
    readonly lobbyId: FieldRef<"GameState", 'String'>
    readonly updatedAt: FieldRef<"GameState", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * GameState findUnique
   */
  export type GameStateFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameState
     */
    select?: GameStateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameState
     */
    omit?: GameStateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameStateInclude<ExtArgs> | null
    /**
     * Filter, which GameState to fetch.
     */
    where: GameStateWhereUniqueInput
  }

  /**
   * GameState findUniqueOrThrow
   */
  export type GameStateFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameState
     */
    select?: GameStateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameState
     */
    omit?: GameStateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameStateInclude<ExtArgs> | null
    /**
     * Filter, which GameState to fetch.
     */
    where: GameStateWhereUniqueInput
  }

  /**
   * GameState findFirst
   */
  export type GameStateFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameState
     */
    select?: GameStateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameState
     */
    omit?: GameStateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameStateInclude<ExtArgs> | null
    /**
     * Filter, which GameState to fetch.
     */
    where?: GameStateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameStates to fetch.
     */
    orderBy?: GameStateOrderByWithRelationInput | GameStateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GameStates.
     */
    cursor?: GameStateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameStates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameStates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GameStates.
     */
    distinct?: GameStateScalarFieldEnum | GameStateScalarFieldEnum[]
  }

  /**
   * GameState findFirstOrThrow
   */
  export type GameStateFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameState
     */
    select?: GameStateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameState
     */
    omit?: GameStateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameStateInclude<ExtArgs> | null
    /**
     * Filter, which GameState to fetch.
     */
    where?: GameStateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameStates to fetch.
     */
    orderBy?: GameStateOrderByWithRelationInput | GameStateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GameStates.
     */
    cursor?: GameStateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameStates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameStates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GameStates.
     */
    distinct?: GameStateScalarFieldEnum | GameStateScalarFieldEnum[]
  }

  /**
   * GameState findMany
   */
  export type GameStateFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameState
     */
    select?: GameStateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameState
     */
    omit?: GameStateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameStateInclude<ExtArgs> | null
    /**
     * Filter, which GameStates to fetch.
     */
    where?: GameStateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameStates to fetch.
     */
    orderBy?: GameStateOrderByWithRelationInput | GameStateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GameStates.
     */
    cursor?: GameStateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameStates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameStates.
     */
    skip?: number
    distinct?: GameStateScalarFieldEnum | GameStateScalarFieldEnum[]
  }

  /**
   * GameState create
   */
  export type GameStateCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameState
     */
    select?: GameStateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameState
     */
    omit?: GameStateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameStateInclude<ExtArgs> | null
    /**
     * The data needed to create a GameState.
     */
    data: XOR<GameStateCreateInput, GameStateUncheckedCreateInput>
  }

  /**
   * GameState createMany
   */
  export type GameStateCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GameStates.
     */
    data: GameStateCreateManyInput | GameStateCreateManyInput[]
  }

  /**
   * GameState createManyAndReturn
   */
  export type GameStateCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameState
     */
    select?: GameStateSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GameState
     */
    omit?: GameStateOmit<ExtArgs> | null
    /**
     * The data used to create many GameStates.
     */
    data: GameStateCreateManyInput | GameStateCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameStateIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * GameState update
   */
  export type GameStateUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameState
     */
    select?: GameStateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameState
     */
    omit?: GameStateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameStateInclude<ExtArgs> | null
    /**
     * The data needed to update a GameState.
     */
    data: XOR<GameStateUpdateInput, GameStateUncheckedUpdateInput>
    /**
     * Choose, which GameState to update.
     */
    where: GameStateWhereUniqueInput
  }

  /**
   * GameState updateMany
   */
  export type GameStateUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GameStates.
     */
    data: XOR<GameStateUpdateManyMutationInput, GameStateUncheckedUpdateManyInput>
    /**
     * Filter which GameStates to update
     */
    where?: GameStateWhereInput
    /**
     * Limit how many GameStates to update.
     */
    limit?: number
  }

  /**
   * GameState updateManyAndReturn
   */
  export type GameStateUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameState
     */
    select?: GameStateSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the GameState
     */
    omit?: GameStateOmit<ExtArgs> | null
    /**
     * The data used to update GameStates.
     */
    data: XOR<GameStateUpdateManyMutationInput, GameStateUncheckedUpdateManyInput>
    /**
     * Filter which GameStates to update
     */
    where?: GameStateWhereInput
    /**
     * Limit how many GameStates to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameStateIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * GameState upsert
   */
  export type GameStateUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameState
     */
    select?: GameStateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameState
     */
    omit?: GameStateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameStateInclude<ExtArgs> | null
    /**
     * The filter to search for the GameState to update in case it exists.
     */
    where: GameStateWhereUniqueInput
    /**
     * In case the GameState found by the `where` argument doesn't exist, create a new GameState with this data.
     */
    create: XOR<GameStateCreateInput, GameStateUncheckedCreateInput>
    /**
     * In case the GameState was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GameStateUpdateInput, GameStateUncheckedUpdateInput>
  }

  /**
   * GameState delete
   */
  export type GameStateDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameState
     */
    select?: GameStateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameState
     */
    omit?: GameStateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameStateInclude<ExtArgs> | null
    /**
     * Filter which GameState to delete.
     */
    where: GameStateWhereUniqueInput
  }

  /**
   * GameState deleteMany
   */
  export type GameStateDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GameStates to delete
     */
    where?: GameStateWhereInput
    /**
     * Limit how many GameStates to delete.
     */
    limit?: number
  }

  /**
   * GameState without action
   */
  export type GameStateDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameState
     */
    select?: GameStateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the GameState
     */
    omit?: GameStateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameStateInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const LobbyScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt'
  };

  export type LobbyScalarFieldEnum = (typeof LobbyScalarFieldEnum)[keyof typeof LobbyScalarFieldEnum]


  export const PlayerScalarFieldEnum: {
    id: 'id',
    name: 'name',
    socketId: 'socketId',
    lobbyId: 'lobbyId'
  };

  export type PlayerScalarFieldEnum = (typeof PlayerScalarFieldEnum)[keyof typeof PlayerScalarFieldEnum]


  export const GameStateScalarFieldEnum: {
    id: 'id',
    state: 'state',
    lobbyId: 'lobbyId',
    updatedAt: 'updatedAt'
  };

  export type GameStateScalarFieldEnum = (typeof GameStateScalarFieldEnum)[keyof typeof GameStateScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    
  /**
   * Deep Input Types
   */


  export type LobbyWhereInput = {
    AND?: LobbyWhereInput | LobbyWhereInput[]
    OR?: LobbyWhereInput[]
    NOT?: LobbyWhereInput | LobbyWhereInput[]
    id?: StringFilter<"Lobby"> | string
    createdAt?: DateTimeFilter<"Lobby"> | Date | string
    players?: PlayerListRelationFilter
    gameState?: XOR<GameStateNullableScalarRelationFilter, GameStateWhereInput> | null
  }

  export type LobbyOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    players?: PlayerOrderByRelationAggregateInput
    gameState?: GameStateOrderByWithRelationInput
  }

  export type LobbyWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: LobbyWhereInput | LobbyWhereInput[]
    OR?: LobbyWhereInput[]
    NOT?: LobbyWhereInput | LobbyWhereInput[]
    createdAt?: DateTimeFilter<"Lobby"> | Date | string
    players?: PlayerListRelationFilter
    gameState?: XOR<GameStateNullableScalarRelationFilter, GameStateWhereInput> | null
  }, "id">

  export type LobbyOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    _count?: LobbyCountOrderByAggregateInput
    _max?: LobbyMaxOrderByAggregateInput
    _min?: LobbyMinOrderByAggregateInput
  }

  export type LobbyScalarWhereWithAggregatesInput = {
    AND?: LobbyScalarWhereWithAggregatesInput | LobbyScalarWhereWithAggregatesInput[]
    OR?: LobbyScalarWhereWithAggregatesInput[]
    NOT?: LobbyScalarWhereWithAggregatesInput | LobbyScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Lobby"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Lobby"> | Date | string
  }

  export type PlayerWhereInput = {
    AND?: PlayerWhereInput | PlayerWhereInput[]
    OR?: PlayerWhereInput[]
    NOT?: PlayerWhereInput | PlayerWhereInput[]
    id?: StringFilter<"Player"> | string
    name?: StringFilter<"Player"> | string
    socketId?: StringFilter<"Player"> | string
    lobbyId?: StringFilter<"Player"> | string
    lobby?: XOR<LobbyScalarRelationFilter, LobbyWhereInput>
  }

  export type PlayerOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    socketId?: SortOrder
    lobbyId?: SortOrder
    lobby?: LobbyOrderByWithRelationInput
  }

  export type PlayerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PlayerWhereInput | PlayerWhereInput[]
    OR?: PlayerWhereInput[]
    NOT?: PlayerWhereInput | PlayerWhereInput[]
    name?: StringFilter<"Player"> | string
    socketId?: StringFilter<"Player"> | string
    lobbyId?: StringFilter<"Player"> | string
    lobby?: XOR<LobbyScalarRelationFilter, LobbyWhereInput>
  }, "id">

  export type PlayerOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    socketId?: SortOrder
    lobbyId?: SortOrder
    _count?: PlayerCountOrderByAggregateInput
    _max?: PlayerMaxOrderByAggregateInput
    _min?: PlayerMinOrderByAggregateInput
  }

  export type PlayerScalarWhereWithAggregatesInput = {
    AND?: PlayerScalarWhereWithAggregatesInput | PlayerScalarWhereWithAggregatesInput[]
    OR?: PlayerScalarWhereWithAggregatesInput[]
    NOT?: PlayerScalarWhereWithAggregatesInput | PlayerScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Player"> | string
    name?: StringWithAggregatesFilter<"Player"> | string
    socketId?: StringWithAggregatesFilter<"Player"> | string
    lobbyId?: StringWithAggregatesFilter<"Player"> | string
  }

  export type GameStateWhereInput = {
    AND?: GameStateWhereInput | GameStateWhereInput[]
    OR?: GameStateWhereInput[]
    NOT?: GameStateWhereInput | GameStateWhereInput[]
    id?: StringFilter<"GameState"> | string
    state?: JsonFilter<"GameState">
    lobbyId?: StringFilter<"GameState"> | string
    updatedAt?: DateTimeFilter<"GameState"> | Date | string
    lobby?: XOR<LobbyScalarRelationFilter, LobbyWhereInput>
  }

  export type GameStateOrderByWithRelationInput = {
    id?: SortOrder
    state?: SortOrder
    lobbyId?: SortOrder
    updatedAt?: SortOrder
    lobby?: LobbyOrderByWithRelationInput
  }

  export type GameStateWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    lobbyId?: string
    AND?: GameStateWhereInput | GameStateWhereInput[]
    OR?: GameStateWhereInput[]
    NOT?: GameStateWhereInput | GameStateWhereInput[]
    state?: JsonFilter<"GameState">
    updatedAt?: DateTimeFilter<"GameState"> | Date | string
    lobby?: XOR<LobbyScalarRelationFilter, LobbyWhereInput>
  }, "id" | "lobbyId">

  export type GameStateOrderByWithAggregationInput = {
    id?: SortOrder
    state?: SortOrder
    lobbyId?: SortOrder
    updatedAt?: SortOrder
    _count?: GameStateCountOrderByAggregateInput
    _max?: GameStateMaxOrderByAggregateInput
    _min?: GameStateMinOrderByAggregateInput
  }

  export type GameStateScalarWhereWithAggregatesInput = {
    AND?: GameStateScalarWhereWithAggregatesInput | GameStateScalarWhereWithAggregatesInput[]
    OR?: GameStateScalarWhereWithAggregatesInput[]
    NOT?: GameStateScalarWhereWithAggregatesInput | GameStateScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"GameState"> | string
    state?: JsonWithAggregatesFilter<"GameState">
    lobbyId?: StringWithAggregatesFilter<"GameState"> | string
    updatedAt?: DateTimeWithAggregatesFilter<"GameState"> | Date | string
  }

  export type LobbyCreateInput = {
    id?: string
    createdAt?: Date | string
    players?: PlayerCreateNestedManyWithoutLobbyInput
    gameState?: GameStateCreateNestedOneWithoutLobbyInput
  }

  export type LobbyUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    players?: PlayerUncheckedCreateNestedManyWithoutLobbyInput
    gameState?: GameStateUncheckedCreateNestedOneWithoutLobbyInput
  }

  export type LobbyUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    players?: PlayerUpdateManyWithoutLobbyNestedInput
    gameState?: GameStateUpdateOneWithoutLobbyNestedInput
  }

  export type LobbyUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    players?: PlayerUncheckedUpdateManyWithoutLobbyNestedInput
    gameState?: GameStateUncheckedUpdateOneWithoutLobbyNestedInput
  }

  export type LobbyCreateManyInput = {
    id?: string
    createdAt?: Date | string
  }

  export type LobbyUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LobbyUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlayerCreateInput = {
    id?: string
    name: string
    socketId: string
    lobby: LobbyCreateNestedOneWithoutPlayersInput
  }

  export type PlayerUncheckedCreateInput = {
    id?: string
    name: string
    socketId: string
    lobbyId: string
  }

  export type PlayerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    socketId?: StringFieldUpdateOperationsInput | string
    lobby?: LobbyUpdateOneRequiredWithoutPlayersNestedInput
  }

  export type PlayerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    socketId?: StringFieldUpdateOperationsInput | string
    lobbyId?: StringFieldUpdateOperationsInput | string
  }

  export type PlayerCreateManyInput = {
    id?: string
    name: string
    socketId: string
    lobbyId: string
  }

  export type PlayerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    socketId?: StringFieldUpdateOperationsInput | string
  }

  export type PlayerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    socketId?: StringFieldUpdateOperationsInput | string
    lobbyId?: StringFieldUpdateOperationsInput | string
  }

  export type GameStateCreateInput = {
    id?: string
    state: JsonNullValueInput | InputJsonValue
    updatedAt?: Date | string
    lobby: LobbyCreateNestedOneWithoutGameStateInput
  }

  export type GameStateUncheckedCreateInput = {
    id?: string
    state: JsonNullValueInput | InputJsonValue
    lobbyId: string
    updatedAt?: Date | string
  }

  export type GameStateUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    state?: JsonNullValueInput | InputJsonValue
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    lobby?: LobbyUpdateOneRequiredWithoutGameStateNestedInput
  }

  export type GameStateUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    state?: JsonNullValueInput | InputJsonValue
    lobbyId?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameStateCreateManyInput = {
    id?: string
    state: JsonNullValueInput | InputJsonValue
    lobbyId: string
    updatedAt?: Date | string
  }

  export type GameStateUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    state?: JsonNullValueInput | InputJsonValue
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameStateUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    state?: JsonNullValueInput | InputJsonValue
    lobbyId?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type PlayerListRelationFilter = {
    every?: PlayerWhereInput
    some?: PlayerWhereInput
    none?: PlayerWhereInput
  }

  export type GameStateNullableScalarRelationFilter = {
    is?: GameStateWhereInput | null
    isNot?: GameStateWhereInput | null
  }

  export type PlayerOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type LobbyCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
  }

  export type LobbyMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
  }

  export type LobbyMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type LobbyScalarRelationFilter = {
    is?: LobbyWhereInput
    isNot?: LobbyWhereInput
  }

  export type PlayerCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    socketId?: SortOrder
    lobbyId?: SortOrder
  }

  export type PlayerMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    socketId?: SortOrder
    lobbyId?: SortOrder
  }

  export type PlayerMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    socketId?: SortOrder
    lobbyId?: SortOrder
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type GameStateCountOrderByAggregateInput = {
    id?: SortOrder
    state?: SortOrder
    lobbyId?: SortOrder
    updatedAt?: SortOrder
  }

  export type GameStateMaxOrderByAggregateInput = {
    id?: SortOrder
    lobbyId?: SortOrder
    updatedAt?: SortOrder
  }

  export type GameStateMinOrderByAggregateInput = {
    id?: SortOrder
    lobbyId?: SortOrder
    updatedAt?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type PlayerCreateNestedManyWithoutLobbyInput = {
    create?: XOR<PlayerCreateWithoutLobbyInput, PlayerUncheckedCreateWithoutLobbyInput> | PlayerCreateWithoutLobbyInput[] | PlayerUncheckedCreateWithoutLobbyInput[]
    connectOrCreate?: PlayerCreateOrConnectWithoutLobbyInput | PlayerCreateOrConnectWithoutLobbyInput[]
    createMany?: PlayerCreateManyLobbyInputEnvelope
    connect?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[]
  }

  export type GameStateCreateNestedOneWithoutLobbyInput = {
    create?: XOR<GameStateCreateWithoutLobbyInput, GameStateUncheckedCreateWithoutLobbyInput>
    connectOrCreate?: GameStateCreateOrConnectWithoutLobbyInput
    connect?: GameStateWhereUniqueInput
  }

  export type PlayerUncheckedCreateNestedManyWithoutLobbyInput = {
    create?: XOR<PlayerCreateWithoutLobbyInput, PlayerUncheckedCreateWithoutLobbyInput> | PlayerCreateWithoutLobbyInput[] | PlayerUncheckedCreateWithoutLobbyInput[]
    connectOrCreate?: PlayerCreateOrConnectWithoutLobbyInput | PlayerCreateOrConnectWithoutLobbyInput[]
    createMany?: PlayerCreateManyLobbyInputEnvelope
    connect?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[]
  }

  export type GameStateUncheckedCreateNestedOneWithoutLobbyInput = {
    create?: XOR<GameStateCreateWithoutLobbyInput, GameStateUncheckedCreateWithoutLobbyInput>
    connectOrCreate?: GameStateCreateOrConnectWithoutLobbyInput
    connect?: GameStateWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type PlayerUpdateManyWithoutLobbyNestedInput = {
    create?: XOR<PlayerCreateWithoutLobbyInput, PlayerUncheckedCreateWithoutLobbyInput> | PlayerCreateWithoutLobbyInput[] | PlayerUncheckedCreateWithoutLobbyInput[]
    connectOrCreate?: PlayerCreateOrConnectWithoutLobbyInput | PlayerCreateOrConnectWithoutLobbyInput[]
    upsert?: PlayerUpsertWithWhereUniqueWithoutLobbyInput | PlayerUpsertWithWhereUniqueWithoutLobbyInput[]
    createMany?: PlayerCreateManyLobbyInputEnvelope
    set?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[]
    disconnect?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[]
    delete?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[]
    connect?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[]
    update?: PlayerUpdateWithWhereUniqueWithoutLobbyInput | PlayerUpdateWithWhereUniqueWithoutLobbyInput[]
    updateMany?: PlayerUpdateManyWithWhereWithoutLobbyInput | PlayerUpdateManyWithWhereWithoutLobbyInput[]
    deleteMany?: PlayerScalarWhereInput | PlayerScalarWhereInput[]
  }

  export type GameStateUpdateOneWithoutLobbyNestedInput = {
    create?: XOR<GameStateCreateWithoutLobbyInput, GameStateUncheckedCreateWithoutLobbyInput>
    connectOrCreate?: GameStateCreateOrConnectWithoutLobbyInput
    upsert?: GameStateUpsertWithoutLobbyInput
    disconnect?: GameStateWhereInput | boolean
    delete?: GameStateWhereInput | boolean
    connect?: GameStateWhereUniqueInput
    update?: XOR<XOR<GameStateUpdateToOneWithWhereWithoutLobbyInput, GameStateUpdateWithoutLobbyInput>, GameStateUncheckedUpdateWithoutLobbyInput>
  }

  export type PlayerUncheckedUpdateManyWithoutLobbyNestedInput = {
    create?: XOR<PlayerCreateWithoutLobbyInput, PlayerUncheckedCreateWithoutLobbyInput> | PlayerCreateWithoutLobbyInput[] | PlayerUncheckedCreateWithoutLobbyInput[]
    connectOrCreate?: PlayerCreateOrConnectWithoutLobbyInput | PlayerCreateOrConnectWithoutLobbyInput[]
    upsert?: PlayerUpsertWithWhereUniqueWithoutLobbyInput | PlayerUpsertWithWhereUniqueWithoutLobbyInput[]
    createMany?: PlayerCreateManyLobbyInputEnvelope
    set?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[]
    disconnect?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[]
    delete?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[]
    connect?: PlayerWhereUniqueInput | PlayerWhereUniqueInput[]
    update?: PlayerUpdateWithWhereUniqueWithoutLobbyInput | PlayerUpdateWithWhereUniqueWithoutLobbyInput[]
    updateMany?: PlayerUpdateManyWithWhereWithoutLobbyInput | PlayerUpdateManyWithWhereWithoutLobbyInput[]
    deleteMany?: PlayerScalarWhereInput | PlayerScalarWhereInput[]
  }

  export type GameStateUncheckedUpdateOneWithoutLobbyNestedInput = {
    create?: XOR<GameStateCreateWithoutLobbyInput, GameStateUncheckedCreateWithoutLobbyInput>
    connectOrCreate?: GameStateCreateOrConnectWithoutLobbyInput
    upsert?: GameStateUpsertWithoutLobbyInput
    disconnect?: GameStateWhereInput | boolean
    delete?: GameStateWhereInput | boolean
    connect?: GameStateWhereUniqueInput
    update?: XOR<XOR<GameStateUpdateToOneWithWhereWithoutLobbyInput, GameStateUpdateWithoutLobbyInput>, GameStateUncheckedUpdateWithoutLobbyInput>
  }

  export type LobbyCreateNestedOneWithoutPlayersInput = {
    create?: XOR<LobbyCreateWithoutPlayersInput, LobbyUncheckedCreateWithoutPlayersInput>
    connectOrCreate?: LobbyCreateOrConnectWithoutPlayersInput
    connect?: LobbyWhereUniqueInput
  }

  export type LobbyUpdateOneRequiredWithoutPlayersNestedInput = {
    create?: XOR<LobbyCreateWithoutPlayersInput, LobbyUncheckedCreateWithoutPlayersInput>
    connectOrCreate?: LobbyCreateOrConnectWithoutPlayersInput
    upsert?: LobbyUpsertWithoutPlayersInput
    connect?: LobbyWhereUniqueInput
    update?: XOR<XOR<LobbyUpdateToOneWithWhereWithoutPlayersInput, LobbyUpdateWithoutPlayersInput>, LobbyUncheckedUpdateWithoutPlayersInput>
  }

  export type LobbyCreateNestedOneWithoutGameStateInput = {
    create?: XOR<LobbyCreateWithoutGameStateInput, LobbyUncheckedCreateWithoutGameStateInput>
    connectOrCreate?: LobbyCreateOrConnectWithoutGameStateInput
    connect?: LobbyWhereUniqueInput
  }

  export type LobbyUpdateOneRequiredWithoutGameStateNestedInput = {
    create?: XOR<LobbyCreateWithoutGameStateInput, LobbyUncheckedCreateWithoutGameStateInput>
    connectOrCreate?: LobbyCreateOrConnectWithoutGameStateInput
    upsert?: LobbyUpsertWithoutGameStateInput
    connect?: LobbyWhereUniqueInput
    update?: XOR<XOR<LobbyUpdateToOneWithWhereWithoutGameStateInput, LobbyUpdateWithoutGameStateInput>, LobbyUncheckedUpdateWithoutGameStateInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type PlayerCreateWithoutLobbyInput = {
    id?: string
    name: string
    socketId: string
  }

  export type PlayerUncheckedCreateWithoutLobbyInput = {
    id?: string
    name: string
    socketId: string
  }

  export type PlayerCreateOrConnectWithoutLobbyInput = {
    where: PlayerWhereUniqueInput
    create: XOR<PlayerCreateWithoutLobbyInput, PlayerUncheckedCreateWithoutLobbyInput>
  }

  export type PlayerCreateManyLobbyInputEnvelope = {
    data: PlayerCreateManyLobbyInput | PlayerCreateManyLobbyInput[]
  }

  export type GameStateCreateWithoutLobbyInput = {
    id?: string
    state: JsonNullValueInput | InputJsonValue
    updatedAt?: Date | string
  }

  export type GameStateUncheckedCreateWithoutLobbyInput = {
    id?: string
    state: JsonNullValueInput | InputJsonValue
    updatedAt?: Date | string
  }

  export type GameStateCreateOrConnectWithoutLobbyInput = {
    where: GameStateWhereUniqueInput
    create: XOR<GameStateCreateWithoutLobbyInput, GameStateUncheckedCreateWithoutLobbyInput>
  }

  export type PlayerUpsertWithWhereUniqueWithoutLobbyInput = {
    where: PlayerWhereUniqueInput
    update: XOR<PlayerUpdateWithoutLobbyInput, PlayerUncheckedUpdateWithoutLobbyInput>
    create: XOR<PlayerCreateWithoutLobbyInput, PlayerUncheckedCreateWithoutLobbyInput>
  }

  export type PlayerUpdateWithWhereUniqueWithoutLobbyInput = {
    where: PlayerWhereUniqueInput
    data: XOR<PlayerUpdateWithoutLobbyInput, PlayerUncheckedUpdateWithoutLobbyInput>
  }

  export type PlayerUpdateManyWithWhereWithoutLobbyInput = {
    where: PlayerScalarWhereInput
    data: XOR<PlayerUpdateManyMutationInput, PlayerUncheckedUpdateManyWithoutLobbyInput>
  }

  export type PlayerScalarWhereInput = {
    AND?: PlayerScalarWhereInput | PlayerScalarWhereInput[]
    OR?: PlayerScalarWhereInput[]
    NOT?: PlayerScalarWhereInput | PlayerScalarWhereInput[]
    id?: StringFilter<"Player"> | string
    name?: StringFilter<"Player"> | string
    socketId?: StringFilter<"Player"> | string
    lobbyId?: StringFilter<"Player"> | string
  }

  export type GameStateUpsertWithoutLobbyInput = {
    update: XOR<GameStateUpdateWithoutLobbyInput, GameStateUncheckedUpdateWithoutLobbyInput>
    create: XOR<GameStateCreateWithoutLobbyInput, GameStateUncheckedCreateWithoutLobbyInput>
    where?: GameStateWhereInput
  }

  export type GameStateUpdateToOneWithWhereWithoutLobbyInput = {
    where?: GameStateWhereInput
    data: XOR<GameStateUpdateWithoutLobbyInput, GameStateUncheckedUpdateWithoutLobbyInput>
  }

  export type GameStateUpdateWithoutLobbyInput = {
    id?: StringFieldUpdateOperationsInput | string
    state?: JsonNullValueInput | InputJsonValue
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameStateUncheckedUpdateWithoutLobbyInput = {
    id?: StringFieldUpdateOperationsInput | string
    state?: JsonNullValueInput | InputJsonValue
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type LobbyCreateWithoutPlayersInput = {
    id?: string
    createdAt?: Date | string
    gameState?: GameStateCreateNestedOneWithoutLobbyInput
  }

  export type LobbyUncheckedCreateWithoutPlayersInput = {
    id?: string
    createdAt?: Date | string
    gameState?: GameStateUncheckedCreateNestedOneWithoutLobbyInput
  }

  export type LobbyCreateOrConnectWithoutPlayersInput = {
    where: LobbyWhereUniqueInput
    create: XOR<LobbyCreateWithoutPlayersInput, LobbyUncheckedCreateWithoutPlayersInput>
  }

  export type LobbyUpsertWithoutPlayersInput = {
    update: XOR<LobbyUpdateWithoutPlayersInput, LobbyUncheckedUpdateWithoutPlayersInput>
    create: XOR<LobbyCreateWithoutPlayersInput, LobbyUncheckedCreateWithoutPlayersInput>
    where?: LobbyWhereInput
  }

  export type LobbyUpdateToOneWithWhereWithoutPlayersInput = {
    where?: LobbyWhereInput
    data: XOR<LobbyUpdateWithoutPlayersInput, LobbyUncheckedUpdateWithoutPlayersInput>
  }

  export type LobbyUpdateWithoutPlayersInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    gameState?: GameStateUpdateOneWithoutLobbyNestedInput
  }

  export type LobbyUncheckedUpdateWithoutPlayersInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    gameState?: GameStateUncheckedUpdateOneWithoutLobbyNestedInput
  }

  export type LobbyCreateWithoutGameStateInput = {
    id?: string
    createdAt?: Date | string
    players?: PlayerCreateNestedManyWithoutLobbyInput
  }

  export type LobbyUncheckedCreateWithoutGameStateInput = {
    id?: string
    createdAt?: Date | string
    players?: PlayerUncheckedCreateNestedManyWithoutLobbyInput
  }

  export type LobbyCreateOrConnectWithoutGameStateInput = {
    where: LobbyWhereUniqueInput
    create: XOR<LobbyCreateWithoutGameStateInput, LobbyUncheckedCreateWithoutGameStateInput>
  }

  export type LobbyUpsertWithoutGameStateInput = {
    update: XOR<LobbyUpdateWithoutGameStateInput, LobbyUncheckedUpdateWithoutGameStateInput>
    create: XOR<LobbyCreateWithoutGameStateInput, LobbyUncheckedCreateWithoutGameStateInput>
    where?: LobbyWhereInput
  }

  export type LobbyUpdateToOneWithWhereWithoutGameStateInput = {
    where?: LobbyWhereInput
    data: XOR<LobbyUpdateWithoutGameStateInput, LobbyUncheckedUpdateWithoutGameStateInput>
  }

  export type LobbyUpdateWithoutGameStateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    players?: PlayerUpdateManyWithoutLobbyNestedInput
  }

  export type LobbyUncheckedUpdateWithoutGameStateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    players?: PlayerUncheckedUpdateManyWithoutLobbyNestedInput
  }

  export type PlayerCreateManyLobbyInput = {
    id?: string
    name: string
    socketId: string
  }

  export type PlayerUpdateWithoutLobbyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    socketId?: StringFieldUpdateOperationsInput | string
  }

  export type PlayerUncheckedUpdateWithoutLobbyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    socketId?: StringFieldUpdateOperationsInput | string
  }

  export type PlayerUncheckedUpdateManyWithoutLobbyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    socketId?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}